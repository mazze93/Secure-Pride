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
