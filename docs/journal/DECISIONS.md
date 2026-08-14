# Decisions log (append-only)

## 2026-08-13 · Journal location · secure-pride/docs/journal, not workspace root
**Why**: Task spans 4 sibling repos under a non-repo domain folder
(`~/Projects/secure-pride/`). The flagship repo already has a
`docs/decisions/DECISION-NNN.md` convention for real architectural decisions;
this journal is for the working session, not a replacement for that log.
**Reversible**: yes — journal is disposable once the strategy doc is written
and phase decisions are folded into real DECISION files.

## 2026-08-13 · Assumption check · no existing consolidation/funding doc
**Assumption**: no consolidation/funding-strategy doc already exists anywhere
in scope, before writing one.
**Verified**: grepped `secure-pride/{docs,decisions}` for `*fund*`,
`*strategy*`, `*sponsor*`, `*consolidat*` — none found. Confirmed true.

## 2026-08-13 · Scope expansion · stranded Downloads artifacts are in scope
**What**: User pointed at 3 files in `~/Downloads` mid-task:
`Secure_Pride_AI_Development_Charter_v3.md`, `sp-cd-push/` (git bundle +
pitch deck pptx), `Security-Configs/securepride-wifi-8021x.mobileconfig`.
**Findings**:
- Charter v3.0 (dated 2026-07-30, "Production-Ready") explicitly supersedes
  `docs/COPILOT-INSTRUCTIONS.md` (the file `CLAUDE.md` currently calls
  canonical) and 2 other docs it names for archival. Never landed in repo.
- `sp-cd-push/sp-community-deck.bundle` is a thin/incremental git bundle
  whose prerequisite commit (`369178b8...`) doesn't exist in any local clone
  or the GitHub remotes (checked `secure-pride`, `secure-pride-design` after
  `git fetch`) — not cleanly replayable, likely lost with the old machine
  per the global CLAUDE.md's own note about that loss. Not pursuing further
  recovery — out of proportion to the task. The `.pptx` inside
  `docs/brand/secure-pride-community-deck.pptx` is intact and usable as-is.
- `securepride-wifi-8021x.mobileconfig` is cert-based EAP-TLS, no plaintext
  PSK/password fields. Context-only signal of infra maturity; not a repo
  artifact, not modified, contents not reproduced verbatim anywhere in this
  journal or the strategy doc.
- Both the charter and (presumably) the deck use the stale repo name
  `mazze93/Secure-Pride` (capitalized) — actual repo is `mazze93/secure-pride`.
  Same rot already found in `secure-pride/CLAUDE.md`. Fixing everywhere found.
**How to reverse**: this is a scope note, not a file change — reversing it
means simply not doing phase 1 (charter landing) if the user redirects.

## 2026-08-13 · Major finding · a fuller consolidation plan already exists in-flight
**What**: `secure-pride-design` has a locked git worktree at
`.claude/worktrees/kintsugi-convergence/` (branch `phase-1-v2-migration`,
pushed to origin, Phase 0 already merged to `main` via PR #1) with its own
`docs/journal/{PLAN,DECISIONS,CHECKPOINT}.md` dated 2026-07-31 — a 6-phase
plan to converge secure-pride-design (kintsugi tokens), the Hugging Face org
card (positioning voice), and `mazze93/secure-pride` (the app) into one
coherent surface, routed through the `~/Projects/tools/stele` governance
harness. Phases 0–1b done; Phase 1c blocked on `claude-local` having no
model installed (`{"models":[]}` at the time).
**Consulted the advisor on how to reconcile.** Verdict, followed here:
- Don't resume/pivot into kintsugi-convergence tonight — it's scoped
  narrower (secure-pride + secure-pride-design + Stele + HF voice) than this
  session's ask (funder offer across all 4 domain repos, including
  `macos-privacy` and `wireshark-beginner-kit`, which kintsugi never
  mentions). The strategy doc should *cite* it as the in-flight
  brand-coherence workstream, not redo or resume it.
- The `claude-local` blocker (empty model list) is resolved — models are now
  installed. **Correction after checking `/api/tags` sizes**: 4 models
  present — `qwen3.6:latest` (23.9GB), `gemma4:latest` (9.6GB),
  `llama3.1:8b` (4.9GB), `nemotron-3-super:cloud` (cloud-routed, not local).
  This machine has **24GB unified RAM** (user-stated, M5 Pro) — `qwen3.6`
  would consume essentially the entire budget with nothing left for the OS
  or the Claude Code harness itself; not viable here despite being loaded.
  `gemma4` (9.6GB) or `llama3.1:8b` (4.9GB) are the realistic local-swarm
  models on this machine. Kintsugi's own checkpoint originally wanted
  `gpt-oss:20b` (~13GB) — also too tight paired with anything else running.
  Not silently resumed on the user's behalf regardless — Phase 4+ of that
  plan is outward-facing and explicitly gated on confirmation.
- Checked the HF org card kintsugi called "the strongest positioning
  articulation" (`SecurePride/README` on Hugging Face, fetched
  2026-08-13): it is currently just the default template placeholder text,
  not the positioning copy kintsugi's PLAN.md describes. Either it reverted,
  was never actually populated on that specific page, or the plan pointed at
  a different surface. Not investigated further — the pitch deck (verified,
  concrete) is a stronger and simpler source for this doc's narrative
  anyway.
- **Do not carry a named individual (records secretary named in kintsugi's
  PLAN.md) into this session's strategy doc.** Kintsugi's own DECISIONS.md
  already flags widening where that name appears as a Tier-3 org-direction
  decision requiring mazze's explicit confirmation, not a copy task.
**How to reverse**: n/a — a finding and a scope boundary, not a file change.
