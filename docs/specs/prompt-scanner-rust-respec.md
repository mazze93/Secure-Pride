# Prompt Scanner v2 — Rust/Cloudflare Workers Build Spec and Handoff

## 1. Scope

### In scope
- Full rewrite of the scanner core in Rust, compiled to WebAssembly, deployed on Cloudflare Workers via `workers-rs`.
- Normalization layer (NFKC, zero-width stripping, confusable/homoglyph folding, entity decoding, bounded recursive decode).
- Deterministic regex/rules engine covering: direct override, prompt leakage, self-concealment, structural role-tag spoofing, encoding evasion, markdown/HTML exfil, canonical PII, canonical credentials, multilingual seeds, mixed-script heuristics.
- Semantic classifier as a separately versioned WASM-compatible artifact (ONNX via `tract`, or hand-rolled) for fuzzy PII, fuzzy credentials, self-concealment intent, multilingual override intent, indirect instruction intent.
- Fail-closed policy orchestrator with coverage-aware confidence scoring.
- CI pipeline using Promptfoo for adversarial regression, GitHub Actions for gating.
- Structured JSON request/response contract (`serde`-derived).
- Telemetry: stage coverage, detector version, rule-pack version, latency, decision, findings — logged server-side only.

### Out of scope (v2)
- Full LLM-as-judge inline scanning (explicitly rejected per prior spec — too slow, too costly, reintroduces injection risk into the detector).
- Client-side-only scanning (must remain server-side to avoid bypass via modified frontend).
- Historical prompt storage/retention beyond hashes + findings.
- Non-Cloudflare deployment targets (containerized alternative documented but not built in v2).

### Explicit non-goals
- 100% detection guarantee. Goal is fail-closed behavior and continuous adversarial coverage growth, not a claim of completeness.

## 2. Objectives and Success Criteria

| Objective | Success criteria |
|---|---|
| Eliminate false-PASS on known miss classes | Self-concealment, multilingual override, homoglyph, zero-width all resolve to WARN/BLOCK/REQUIRE_REVIEW, not PASS |
| Fail-closed guarantee | No code path can emit PASS when `coverage.rules == false` or `coverage.normalization == false` |
| Edge performance budget | p50 under 15ms, p95 under 60ms per scan on Workers paid plan |
| CI regression gate | Every fixture in `fixtures/` must pass on every PR; nightly adversarial suite runs full corpus |
| Crate compatibility | 100% of chosen crates confirmed against Cloudflare's supported-crates list before merge |

## 3. Architecture (Rust-native)

```text
Client
  |
  v
Cloudflare Worker (Rust / workers-rs)
  |
  |-- normalization::normalize(text) -> NormalizedText
  |-- rules::scan(&NormalizedText) -> Vec<Finding>
  |-- semantic::classify(&NormalizedText) -> Vec<Finding>  (WASM artifact, versioned)
  |-- policy::decide(rules_findings, semantic_findings, coverage) -> ScanResponse
  |
  v
JSON response (decision, confidence, coverage, findings, redacted_text, versions)
```

### Crate selection (verify against Cloudflare supported-crates list before lock-in)

| Purpose | Crate | Status |
|---|---|---|
| Unicode normalization | `unicode-normalization` | no_std compatible, confirmed lightweight |
| Confusable/homoglyph folding | `unicode-security` or custom skeleton table | verify wasm32 target compiles cleanly |
| Regex rules engine | `regex` | confirmed to work under workers-rs |
| Serialization | `serde` + `serde_json` | standard, confirmed |
| Base64/hex decode for bounded recursive decode | `base64`, `hex` | lightweight, no_std variants preferred |
| Semantic inference | `tract` (ONNX) or hand-rolled | must validate wasm32-unknown-unknown target explicitly |
| Worker runtime | `worker` (workers-rs) | official Cloudflare SDK |

## 4. Data Contracts

### Request

```rust
#[derive(Deserialize)]
pub struct ScanRequest {
    pub text: String,
    pub context: Option<ScanContext>,
    pub options: Option<ScanOptions>,
}

#[derive(Deserialize)]
pub struct ScanContext {
    pub channel: Option<String>,       // web | cli | api | editor
    pub content_type: Option<String>,  // plain | markdown | html | json | mixed
    pub locale_hint: Option<String>,
}

#[derive(Deserialize)]
pub struct ScanOptions {
    pub redact: Option<bool>,
    pub max_decode_depth: Option<u8>,
    pub return_offsets: Option<bool>,
}
```

### Response

```rust
#[derive(Serialize)]
pub struct ScanResponse {
    pub decision: Decision,           // Pass | Warn | Block | RequireReview
    pub confidence: f32,
    pub coverage: Coverage,
    pub scores: HashMap<String, i32>,
    pub findings: Vec<Finding>,
    pub redacted_text: Option<String>,
    pub versions: Versions,
}

#[derive(Serialize)]
pub struct Coverage {
    pub normalization: bool,
    pub rules: bool,
    pub semantic: bool,
}

#[derive(Serialize)]
pub struct Finding {
    pub id: String,
    pub severity: Severity,           // Low | Medium | High | Critical
    pub span: Option<(usize, usize)>,
    pub evidence: Option<String>,
    pub normalized_evidence: Option<String>,
    pub action: Decision,
}

#[derive(Serialize)]
pub struct Versions {
    pub rules: String,
    pub semantic_model: Option<String>,
}
```

## 5. Fail-Closed Policy Logic

```rust
fn decide(rules_hit: &[Finding], semantic_hit: &[Finding], coverage: &Coverage) -> (Decision, f32) {
    if !coverage.normalization || !coverage.rules {
        return (Decision::RequireReview, 0.0);
    }
    let block = rules_hit.iter().any(|f| f.action == Decision::Block)
        || semantic_hit.iter().any(|f| f.action == Decision::Block);
    if block {
        return (Decision::Block, 0.95);
    }
    let warn = !rules_hit.is_empty() || !semantic_hit.is_empty();
    if warn {
        let base_confidence = if coverage.semantic { 0.8 } else { 0.5 };
        return (Decision::Warn, base_confidence);
    }
    // PASS only allowed when all coverage flags true and zero findings
    if coverage.semantic {
        (Decision::Pass, 0.9)
    } else {
        (Decision::RequireReview, 0.3)
    }
}
```

Key rule: PASS is unreachable unless `coverage.semantic == true` and zero findings across both detection stages. This directly fixes the observed false-PASS behavior in the JS/regex-only version.

## 6. Project Structure

```text
scanner-rs/
  Cargo.toml
  crates/
    scanner-core/        # normalization + orchestration, no_std where possible
    scanner-rules/        # regex rule packs, versioned JSON/TOML rule definitions
    scanner-semantic/     # WASM-compiled classifier, versioned separately
    scanner-worker/       # workers-rs entrypoint, HTTP handling
  fixtures/
    injection/
    pii/
    credentials/
    multilingual/
    unicode/
    exfil/
  promptfoo/
    promptfooconfig.yaml
  .github/workflows/
    scanner-ci.yml
  wrangler.toml
```

## 7. CI Pipeline

- PR gate: `cargo test` (unit tests for normalization/rules) + Promptfoo fixture suite against a deployed preview Worker.
- Nightly: full adversarial corpus, multilingual set, mutation-generated obfuscation variants.
- Release candidate: full corpus + score calibration diff + latency budget check (`p50 < 15ms`, `p95 < 60ms`).
- Every fixture that previously produced a false PASS (self-concealment, multilingual override, homoglyph credential, zero-width) becomes a permanent regression fixture — CI fails the build if any of them return PASS.

```yaml
name: scanner-ci
on:
  pull_request:
  push:
    branches: [main]
  schedule:
    - cron: '0 6 * * *'

jobs:
  rust-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dtolnay/rust-toolchain@stable
        with:
          targets: wasm32-unknown-unknown
      - run: cargo test --workspace
      - run: cargo build --target wasm32-unknown-unknown --release

  promptfoo-eval:
    needs: rust-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx wrangler deploy --env preview
      - run: npx promptfoo@latest eval -c promptfoo/promptfooconfig.yaml -o output/results.json
      - run: node scripts/check-thresholds.js output/results.json
```

## 8. Deployment Handoff

### Prerequisites
- Rust toolchain with `wasm32-unknown-unknown` target installed.
- `wrangler` CLI authenticated against the Cloudflare account.
- `cargo generate cloudflare/workers-rs` used for initial scaffolding, then restructured into the workspace layout above.

### Deployment steps
1. `cargo build --target wasm32-unknown-unknown --release` for each crate that compiles to WASM.
2. `wrangler deploy --env staging` to push to a staging Worker route first.
3. Run full Promptfoo fixture suite against staging before promoting.
4. `wrangler deploy --env production` only after staging passes all fixtures with zero false-PASS regressions.
5. Tag the release with rule-pack version and semantic-model version embedded in the `versions` field of every response.

### Rollback plan
- Keep the previous Worker version pinned via Wrangler's version aliasing.
- If telemetry shows `coverage.semantic == false` spiking post-deploy, roll back immediately — that signals the semantic WASM artifact failed to load or timed out.

### Ownership handoff checklist
- [ ] Confirm all crates in Cargo.toml appear on Cloudflare's supported-crates list.
- [ ] Confirm fixture suite includes all four previously-identified false-PASS cases.
- [ ] Confirm PASS is unreachable without full coverage (unit test this explicitly).
- [ ] Confirm telemetry dashboard tracks coverage flags per request, not just decision.
- [ ] Confirm rollback alias is documented and tested once before go-live.

## 9. Decision

Best choice: Rust core on Cloudflare Workers via workers-rs, deterministic-first with a separately versioned WASM semantic layer, Promptfoo CI gating, fail-closed orchestration where PASS requires full stage coverage.

Why: matches the existing Cloudflare-native stack, removes the JS-to-WASM boundary, gives memory-safety guarantees on untrusted input parsing, and structurally fixes the false-PASS behavior via the coverage-gated decision function above.

When not to use: if the semantic model requires heavy ML runtime dependencies that do not compile cleanly to wasm32-unknown-unknown — in that case isolate semantic scoring to a separate regional service called async, with the Worker defaulting to REQUIRE_REVIEW on timeout.

Alternative: containerized Rust API (Actix/Axum) on Fly.io or a small regional VM, trading edge latency for easier native ML runtime support.
