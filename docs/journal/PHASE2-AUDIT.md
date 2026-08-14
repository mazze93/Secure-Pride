# Phase 2: Design-System Gap Audit

`secure-pride-design/project/` (kintsugi identity kit, source of truth) vs.
what's actually landed in `secure-pride/docs/brand/` and the live site
(`secure-pride/src/`, `secure-pride/public/`).

**Note on timing**: this audit was first written against `origin/main` at
`900643e`. Before it could be pushed, `857a6f9` ("Kintsugi reskin — palette,
typography, glow recolor (#44)") landed on `main` at 05:42 EDT and fully
activated the kintsugi palette across live components — resolving the
original "palette landed but unused" finding below almost the moment it was
written. Rebased onto that commit and re-verified against the current tree
before finalizing; the findings below reflect post-#44 state.

## Landed / matches

- **`design-system-v2.jsx`** — byte-identical between
  `secure-pride-design/project/` and `secure-pride/docs/brand/`. Fully synced.
- **Primary mark** — `secure-pride/public/logo.svg` and
  `secure-pride-design/project/identity-kit/01_primary/brass_master.svg` are
  the same shield (`viewBox 0 0 1024 1024`, same gradient stops, same
  `aria-label="Secure Pride — Heart-Lock Shield"`). The brass mark is live.
- **Kintsugi color tokens, now live and consumed.** `src/styles/tokens.css`
  mirrors `secure-pride-design/colors_and_type.css` 1:1 (the git-tracked
  source of truth, confirmed by PR #44's follow-up correction commit), and
  `tailwind.config.ts`'s `neon`/`brand`/`dark`/`text`/`light` groups all
  resolve through `var(--sp-*)` references into it — same Tailwind keys as
  v1, so no component needed touching for the base swap.
  `scripts/check-color-tokens.mjs` fails `npm run check` on any raw hex
  literal in `tailwind.config.ts`, making this exact kind of
  landed-but-unused drift structurally impossible going forward. Verified
  landed (commit cites `npm run check` + Playwright screenshots); no gap.
- **`docs/brand/README.md` palette description — was stale, now fixed.** It
  stated the "core palette" as `Teal #0a7e74, Purple #3a2a5e, Cyan #06d6e0,
  Pink #ff2d95` — the neon set PR #44 retired, and even then with hex values
  that didn't match either the old neon file or the new kintsugi one
  exactly. Corrected in this pass (see this repo's own commit) to cite the
  current `--sp-*` values and point at `tokens.css`/`colors_and_type.css` as
  the living source, rather than hardcoding hex that will drift again next
  repaint.

## Gaps

1. **Favicon set incomplete.** The identity kit ships a full set
   (`favicons/`: 16/32/48/64/180/192/256/512 PNG, `apple-touch-icon.png`,
   `mono-dark.svg`, `mono-light.svg`, `favicon-simplified.svg`,
   `site.webmanifest`, and a drop-in `head-snippet.html`). The live site
   (`Layout.astro`) wires up exactly one: `<link rel="icon" ... href="/favicon.svg">`.
   Missing: PNG fallbacks (older browsers / some crawlers don't resolve SVG
   favicons), `apple-touch-icon` (no proper iOS home-screen icon — falls back
   to a screenshot), `site.webmanifest` (no PWA/Android home-screen identity),
   and the `theme-color`/`msapplication-TileColor` meta tags. This is a
   contained, low-risk fix — copy the kit's `favicons/` into `public/favicons/`
   and drop in the kit's own `head-snippet.html`. Tier 1 (autonomous) per the
   charter; holding for phase 5 presentation rather than doing it mid-audit,
   since PLAN.md scoped this phase as read/diff-only.

2. **UI kit (`ui_kits/web/`) is a prototype, not integrated.** It's a
   standalone `index.html` (landing, audit dashboard, report view,
   settings/profile screens) documented as "derived from
   `docs/brand/design-system-v2.jsx`" but never wired into the live Astro
   site — no audit dashboard, report view, or settings screens exist in
   `secure-pride/src/pages` or `src/components` today. This is expected
   (the live site is marketing-only, no authenticated product surface yet)
   but worth naming explicitly for the phase 4 strategy doc: the kit is
   further ahead of the product than the product is.

3. **Repo-name rot inside `secure-pride-design`, not fixed here.**
   `ui_kits/web/README.md`'s "Sources" line reads
   `docs/brand/design-system-v2.jsx` in `mazze93/Secure-Pride` — same
   capitalization rot phase 1 already fixed in this repo's own `CLAUDE.md`
   and charter. `secure-pride-design` is read-only scope for this phase
   (per `PLAN.md`); noting it here so phase 4/5 carries it forward rather
   than losing it. Not fixed now: out of this phase's write scope, and it's
   a one-line, low-risk fix that doesn't need to block anything — but per
   the "see rot, fix rot" rule it must not get silently dropped either.

## Not audited this pass

- `macos-privacy` and `wireshark-beginner-kit` — out of scope for phase 2
  (design-system audit is specifically `secure-pride-design` vs
  `secure-pride`/live site); their branding posture is phase 3/4 territory
  (positioning, not design-system mechanics).
