# Phase 5: Execution

User reviewed the phase 4 strategy, gave in-depth strategic input, and
approved proceeding with the planned changes. This records what was
actually done, plus one major discovery made mid-execution.

## Deck-vs-site maturity — resolved

User confirmed no paying clients currently exist, aside from one standing
partnership (tennis919 — reads as the sports league named in the pitch
deck's founder-story slide, an insider deployment, not external market
validation). This settles phase 3/4's open question: the live site's "This
isn't a trial. This is the product," a live $200/mo tier with no pilot
language, was overclaiming. Fixed:

- **`Pricing.astro`** — Organization tier's tagline and CTA reframed to
  pilot-stage honesty ("Piloting now with early partners — join to help
  shape what ships" / "Join the pilot" replacing "Less than the cost of one
  incident response consultation." / "Get started"). Community tier
  ("This isn't a trial. This is the product.") left unchanged — it's true:
  free, full-featured, no gates, no card required.
- **`WhatWeDo.astro`** — step 01 of "How it works" led with the self-host
  Docker claim ("Self-hosted on your infrastructure. Your data never
  touches our servers.") paired with a command that doesn't actually run
  the scanner (see below). Reframed to lead with "Try the live scanner"
  (true today) and added an honest caveat on the Docker path, matching PR
  #47's own README disclosure.
- **`Credibility.astro`** — "Self-hostable... Your data stays on your
  infrastructure. Always." badge corrected to disclose that scanning
  currently runs on the hosted deployment; full self-hosted scanning noted
  as roadmap, not shipped.

This directly extends PR #47's Docker/Functions-scope disclosure (phase 3's
sharpest finding) from the GitHub README onto the marketing pages that were
making the same claim without caveat.

## Credibility citation — added

Per the in-depth strategy discussion: the pitch deck and live site's only
trust signal was the founder-story/mission framing; the user's actual
professional background (two disclosed HIGH-severity CVEs in js-yaml,
CVSS 8.2/8.7, via a documented six-phase disclosure methodology; academic
research background) was completely unused. Added one paragraph to
`Credibility.astro` citing that work and linking to mazzeleczzare.com —
citation, not a merger of identities. The nonprofit's public story stays
mission-first; the credibility line is two sentences, not a rebrand.

`macos-privacy` confirmed excluded from the offer per user's explicit
agreement with that recommendation — no action needed, it already carries
no Secure Pride branding.

## Favicon set — completed, with a mid-task mark change

Started from the phase 2 finding (favicon set incomplete vs. the identity
kit). Mid-task, the user supplied a shield asset at
`/Users/mazze/Code/secure-pride-org/securepride shield .png` — a variant of
the brass heart-lock mark with a rainbow-glint accent along the shield's
lower edge, not present in `secure-pride-design`'s current
`identity-kit/01_primary/brass_master.svg`. User confirmed this is the
intended/canonical mark, not the old one.

Generated the full favicon set from it (`sips`, padded to a square
transparent canvas at 484×484 before downscaling to avoid distorting the
shield's proportions, since the source PNG was 430×484): 16/32/48/64/192/
256/512 px PNGs + a 180px apple-touch-icon, written to
`public/favicons/`. No vector (SVG) version of the new mark exists yet, so
unlike the identity kit's original favicon set, this one is PNG-only —
`favicon-simplified.svg`/`master.svg` were dropped rather than left
mismatched. `site.webmanifest` rewritten to match. `Layout.astro` and
`ToolLayout.astro` updated to reference the new set;
`public/favicon.svg` (old mark, now fully unreferenced) deleted.
`npm run check` passes after each change.

**Follow-up, not done here**: `secure-pride-design`'s
`identity-kit/01_primary/brass_master.svg` is now stale relative to the
canonical mark — it has no vector source for the rainbow-glint version, and
producing one is a design task, not a docs/positioning one. Flagging for a
future pass rather than attempting a hand-redraw.

## Major discovery: a second, future-canonical repo

While sourcing the shield asset, found `/Users/mazze/Code/secure-pride-org/`
— a full separate git clone, owned by a different local macOS user account
(`mazze`, not the `daedalus` account this whole session has run under),
with remote `https://github.com/Secure-Pride/secure-pride.git` (an
org-owned repo, distinct from `mazze93/secure-pride`, the repo this entire
audit has been conducted against). It contains:

- A Hugging Face Space (`README.md` has HF Space frontmatter, `sdk: static`)
  — **user confirmed this is deployed and live**, separate from
  securepride.org's Cloudflare Pages deployment.
- A GitHub Pages deploy workflow (`.github/workflows/static.yml`).
- A plain static HTML/CSS site (`securepride-site/`, no Astro, no build
  step) with its own logo assets and a `tools/` directory listing three
  tools not present anywhere else in this audit: Security Posture Check,
  Smart Form Filler, Certificate Audit — all confirmed stub/placeholder
  pages ("Coming soon... under development"), not built.

**User confirmed**: `Secure-Pride/secure-pride` is "the intended future
canonical structure that will inherit everything I've built for it" — i.e.
`mazze93/secure-pride`, `secure-pride-design`, and presumably the other
repos in this audit's scope are meant to eventually migrate there.

**User decision on scope, this session**: finish phase 5 against today's
live flagship (`mazze93/secure-pride` + `secure-pride-design`); treat the
org-repo migration as future work, not something to execute now. Reasons
this wasn't attempted: no confirmed push access to the `Secure-Pride` org
repo from this session's GitHub auth (scoped to `mazze93`), and the local
clone is owned by a different OS user account (git itself flagged "dubious
ownership" crossing that boundary — left as-is rather than overridden via
global git config, per this session's standing git-safety rules).

This is now the single most important finding for whatever comes after
this phase-1–5 audit: everything phases 2–5 did (kintsugi palette landing,
positioning reconciliation, README edits, favicon set) is work on an
*interim* flagship, not the final canonical repo. None of it is wasted —
it's exactly the material that would carry over in a migration — but the
migration itself (repo move, org-account access, DNS/deployment cutover
from Cloudflare Pages to wherever the org repo ends up serving from,
reconciling the three stub tools and the HF Space/GitHub Pages surfaces
into one story) is a substantially larger undertaking than this
consolidation pass, and should be scoped as its own effort with its own
plan, not folded into this journal's remaining scope.

## `secure-pride-design` README — see separate commit in that repo

Reframed to state its relationship to the flagship instead of an
independent "sovereignty stack" mission (phase 4 recommendation), and
fixed the `mazze93/Secure-Pride` capitalization rot in `ui_kits/web/README.md`
flagged back in phase 2 and carried forward since.

Push hit a third concurrent-work race this session (after PR #44 in phase 2
and the `docs/readme-reframe` discovery before phase 4): two PRs
("Kintsugi V2 convergence," "Phase 1: kintsugi V2 migration + component
factory") landed on `secure-pride-design`'s `main` between reading the file
and pushing. They rewrote the same file's "Color System" section — a
disjoint region from the "Product Context"/links/"Sources" edits made here.
Rebased and verified the diff didn't overlap before pushing; commit
`d0c121a` on top of `38c081a`.
