# Decision: Merge Copilot Instructions + Mindful Development Charter into one document

**Date**: 2026-07-30
**Category**: Architecture / Documentation
**Decision ID**: DECISION-005

## Context
Secure Pride had three overlapping sources of AI-development governance —
`mindful-development-charter.md` (v1.0, compact), `Secure_Pride_Copilot_Instructions.md`
(v2.0, expanded superset of the same content, landed in this repo as
`docs/COPILOT-INSTRUCTIONS.md`), and an ad hoc "production-grade code
generation partner" prompt drafted for reuse as a Claude Project's custom
instructions. All three restated nearly identical security-hard-requirements
and escalation-trigger language, and the v2.0 document also had a duplicate
file (`_copy.md`) and mojibake encoding damage from an earlier copy/paste
through a lossy character set.

## Options Considered

**Option A: Patch each file in place**
- Pros: low effort
- Cons: leaves three documents to keep in sync; doesn't remove the
  vendor-specific "Copilot" framing
- Estimated effort: low, but recurring

**Option B: Fold everything into the Anchor/Stele workspace directive only**
- Pros: removes redundancy
- Cons: makes the charter unreadable without that directive open, and
  Secure Pride is meant to be legible to a fully separate 501(c)(3) board and
  future contributors who won't have Mazze's personal tooling context
- Estimated effort: medium

**Option C: Consolidate into one project-level charter, cross-referencing the
workspace directive rather than restating it verbatim**
- Pros: single source of truth; standalone-readable; vendor-neutral
- Cons: the resulting document is long
- Estimated effort: medium — chosen

## Decision
We chose **Option C** because:
- A single canonical file with no vendor branding, cross-referencing the
  workspace directive where it already governs the same ground (security
  hard requirements, escalation triggers) instead of copy-pasting duplicates
- It stays self-contained enough that a contributor without directive access
  can use it standalone

## Rationale
- **Alignment with Secure Pride values**: privacy-first, ADHD-accessible,
  LGBTQ+-centered mission — a governance document contributors can actually
  read end to end is part of that accessibility commitment
- **Trade-offs accepted**: the charter is now long (487 lines). Acceptable
  for a governance document read occasionally and referenced by section, not
  read start-to-finish every session
- **Risks mitigated**: three copies of the same escalation rule is three
  places that can silently disagree after the next edit. Removing "Copilot"
  avoids implying a GitHub-Copilot-specific tool when the actual stack is
  explicitly vendor-swappable (`Claude API (swappable)`). Fixing the
  "WCAG 3.0" citation (a W3C working draft, not an adopted standard) and the
  44×44 touch-target claim (AAA figure, not AA — used as a deliberate
  practical floor, not an AA-compliance claim) keeps the compliance language
  honest
- **Success criteria**: no future edit needs to touch more than one file to
  change a security or escalation rule; a new contributor can read this file
  alone and understand the operating model without needing the personal
  workspace directive

## Implementation Plan
- [x] Archive v2.0 (`docs/COPILOT-INSTRUCTIONS.md`) to
      `docs/history/2026-07-30-copilot-instructions-v2-superseded.md`
- [x] Land v3.0 as the canonical `docs/COPILOT-INSTRUCTIONS.md`, fixing the
      `mazze93/Secure-Pride` → `mazze93/secure-pride` repo-name rot in the
      same pass
- [x] File this decision
- [ ] Fix the matching rot in `CLAUDE.md` (same pass, separate commit)
- [ ] `mindful-development-charter.md` v1.0 and `Secure_Pride_Copilot_Instructions_copy.md`
      were not found anywhere in this repo or the `secure-pride` domain
      folder — nothing to archive/delete for those; noting as closed rather
      than outstanding

## Outcome (updated later)
- Landed 2026-08-13, several weeks after the charter's own stated date
  (2026-07-30) — the file had been sitting in `~/Downloads` unmerged. Landed
  as part of a broader Secure-Pride-domain consolidation pass; see
  `docs/journal/` for that session's working notes.
