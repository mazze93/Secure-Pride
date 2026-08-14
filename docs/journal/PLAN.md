# Journal: Secure Pride domain consolidation (funder/sponsor offer)

**Request**: Analyze the four repos under `~/Projects/secure-pride/` —
`secure-pride` (flagship Astro site, securepride.org), `secure-pride-design`
(unlanded "kintsugi" identity kit + UI kit from Claude Design), `macos-privacy`
(standalone privacy tooling, not currently Secure-Pride-branded), and
`wireshark-beginner-kit` (teaching material, already self-describes as "part
of Secure Pride") — and produce a consolidation strategy so they read as one
cohesive, funder/sponsor-appealing offer rather than four loosely-related
repos. Also land stranded work discovered mid-task (see Decisions).

**Repos/paths in scope**:
- `~/Projects/secure-pride/secure-pride/` (write: docs, CLAUDE.md rot fix, charter landing)
- `~/Projects/secure-pride/secure-pride-design/` (read-only audit)
- `~/Projects/secure-pride/macos-privacy/` (read-only audit)
- `~/Projects/secure-pride/wireshark-beginner-kit/` (read-only audit)
- `~/Downloads/Secure_Pride_AI_Development_Charter_v3.md` (source to land)
- `~/Downloads/sp-cd-push/` (source: pitch deck, read-only reference)
- `~/Downloads/Security-Configs/securepride-wifi-8021x.mobileconfig` (context only, not touched)

No pushes without explicit go-ahead per repo. No repo moves/merges without a
separate go-ahead once the strategy options are on the table.

## Phases
1. **Land the charter** — replace `docs/COPILOT-INSTRUCTIONS.md` content with
   v3.0, archive superseded docs per the charter's own instructions, fix
   `Secure-Pride` → `secure-pride` rot in CLAUDE.md and the charter, assign a
   decision ID and file `decisions/DECISION-003.md` (the charter's own
   "worked example" decision, made real).
2. **Design-system gap audit** — what's in `secure-pride-design/project/`
   (kintsugi identity kit) vs. what's actually landed in `secure-pride/docs/brand/`
   and the live site. Local-swarm agent does the file diff/read; I judge.
3. **Positioning audit** — read the existing pitch deck content
   (`sp-cd-push/docs/brand/secure-pride-community-deck.pptx`) and each repo's
   framing, to avoid re-deriving a narrative that already exists.
4. **Draft consolidation strategy** — repo-structure options (status quo /
   monorepo / flagship+satellites), a one-sentence positioning line per repo,
   and what "cohesive funder offer" concretely means (README cross-links,
   shared badge/identity, one landing narrative). Local-swarm drafts, I edit
   and decide.
5. **Present strategy to user** — no structural repo changes execute without
   explicit go-ahead on the specific plan.

## Constraints
- Conserve cloud tokens: local-swarm (Ollama) does bulk reading/first-draft
  synthesis; cloud session keeps judgment calls, decisions, and anything
  touching security/privacy framing (SOGI data, charter Tier 3 territory).
- Commit at each phase boundary in `secure-pride/secure-pride`.
- Never print the wifi mobileconfig's cert/subject fields verbatim in any
  output file — reference its existence only.
