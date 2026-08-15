# Phase 4: Consolidation Strategy

Draft only — no structural changes execute from this document. Per
`PLAN.md`: "No repo moves/merges without a separate go-ahead once the
strategy options are on the table." Phase 5 is presenting this for that
go-ahead.

## Starting position (from phases 2–3)

- The product and its brand mark are real and landed: the kintsugi shield,
  `design-system-v2.jsx`, and the color tokens are all in sync between
  `secure-pride-design` and the live site (phase 2).
- What's fragmented is the *story*, not the *build*. Five simultaneous
  self-descriptions of what Secure Pride is: pitch deck (AI-scanner,
  early-stage/pilot-seeking), live site (AI-scanner, shipping/priced),
  `secure-pride-design` (five-product "sovereignty stack"),
  `wireshark-beginner-kit` (teaching umbrella), and now PR #47's README
  (general security-infrastructure/OSS framing) — settled by you as the
  GitHub-README register, distinct from the funder-facing site register
  (phase 3).
- One factual gap survives independent of narrative: the live site's own
  `docker run` instructions don't run the scanner (PR #47's README already
  discloses this; the marketing pages that make the same self-host claim —
  `WhatWeDo.astro`, `Credibility.astro`, the trust bar — do not).
- `macos-privacy` carries zero Secure Pride branding today and serves a
  different audience (individual developers) than every other repo
  (community organizations).

## Repo-structure options

**A. Status quo — four independent repos, lightly cross-linked.**
Lowest effort, zero migration risk, each repo keeps its own tooling and
release cadence (Astro/Cloudflare Pages for the site, a Claude-Design skill
for `secure-pride-design`, plain static assets for `wireshark-beginner-kit`,
shell scripts for `macos-privacy` — genuinely different build systems that
gain nothing from being co-located). Doesn't by itself fix the positioning
fragmentation: a funder browsing GitHub still lands on four repos with four
voices unless each repo's *README* is edited to cross-reference the others
consistently. That editing is cheap and repo-structure-agnostic — it's the
real lever, independent of which structural option is chosen.

**B. Monorepo — merge some or all into one repository.**
Forces one README, atomic cross-repo commits, single CI. Against it: the
workspace's own governing contract (`~/Projects/CLAUDE.md`, `WORKSPACE.md`)
already made this call — no submodules, projects are independent sibling
clones grouped by domain, not merged. Re-litigating that here would be
scope creep beyond what this audit was asked to produce. It also doesn't
solve the actual problem: `macos-privacy` and `wireshark-beginner-kit`
have different audiences and purposes from the flagship product: being in
the same repo doesn't make a funder read them as one coherent offer, it
just makes the repo bigger. Not recommended.

**C. Flagship + satellites (recommended).**
`secure-pride` stays the canonical entry point — the one place "what is
Secure Pride" gets answered for an outside reader, in whichever register
fits the audience reading it (funder-facing site copy vs. PR #47's
technical README). Every other repo's README leads with one sentence
stating its relationship to the flagship, rather than independently
re-deriving a mission statement. This is close to status quo
operationally (no repo moves, no merges) — the actual work is README
content, not repo topology. The "consolidation" is narrative, not
structural.

**Recommendation: C, implemented as README edits, not repo moves.** This
matches what phase 2 and 3 already found: the mark, the tokens, and (once
PR #47 merges) the honest Docker disclosure are already landed. What's
missing is each repo *pointing at* that shared identity instead of
independently describing the org.

## One-sentence positioning per repo

- **`secure-pride` (flagship)** — the security scanner protecting LGBTQ+
  community organizations' AI-tool conversations from prompt injection and
  data leaks, free for orgs under 10 staff *(funder/site register)*; "security
  infrastructure for people who cannot fail safely," of which the AI Safety
  Scanner is one shipped surface *(PR #47's GitHub-README register)*. Two
  registers, same underlying claim — this is the split you already settled.
- **`secure-pride-design`** — the kintsugi design system and identity kit
  that skins every Secure Pride surface; not a second product line or a
  second description of the org's mission. Its README currently reads as
  the latter (the five-product "sovereignty stack" framing) — that's the
  one edit this option actually requires.
- **`wireshark-beginner-kit`** — a beginner's field guide to packet
  capture, part of Secure Pride's practical-security teaching materials.
  Already frames itself this way (phase 3, finding 5) — no rewrite needed,
  just confirm it links back to securepride.org.
- **`macos-privacy`** — currently: unrelated. Recommend leaving it that
  way rather than retrofitting a Secure Pride connection it doesn't
  actually have. If you want it in the family, the honest framing is
  "an internal tool the founder also maintains," not a community-facing
  product — see open question below.

## What "cohesive funder offer" concretely means

1. **One canonical top-line sentence, reused verbatim** across the pitch
   deck, the live site's Hero, and the opening line of every public repo's
   README — even though the register changes below that line (funder-facing
   site prose vs. PR #47's technical README voice), so no one who reads two
   of these sources gets a different first answer to "what is this."
2. **Every repo's README opens by stating its relationship to the
   flagship**, not an independent mission statement. This is the specific,
   cheap fix `secure-pride-design`'s README needs (phase 3, finding 3).
3. **Consistent shared identity** — largely already true (phase 2: mark and
   tokens landed and guarded by `check-color-tokens.mjs`). Remaining gap:
   confirm `wireshark-beginner-kit` and `secure-pride-design`'s public-facing
   surfaces actually show the shield mark, not just reference it in prose.
4. **Resolve the deck-vs-site maturity contradiction — a decision only you
   can make, not something this doc resolves.** The pitch deck's ask is
   built on "I need pilot organizations to tell me if this works" — if
   that's still true, the live site's "This isn't a trial. This is the
   product" and live $200/mo tier oversell relative to the pitch you're
   actually making in the room. If it's no longer true (you do have paying
   orgs, pricing is real), the deck undersells and should be updated before
   the next pitch. Either direction is a legitimate strategic call; picking
   one and making the site and deck agree is the actual fix.
5. **Extend PR #47's Docker disclosure to the marketing pages that make the
   same self-host claim** — `WhatWeDo.astro`, `Credibility.astro`, the
   trust bar — so the same fact isn't disclosed in one document and
   asserted without caveat in another that a prospect is more likely to
   read first.

## Open question for phase 5

Whether `macos-privacy` belongs under the Secure Pride umbrella at all, and
on what terms if so (internal-tooling credit line vs. full satellite
status vs. staying fully separate). Everything else above has a clear
recommended direction; this one doesn't — it's a call about what the
"offer" should even include, not a documentation fix.
