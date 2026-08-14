# Phase 2: Design-System Gap Audit

`secure-pride-design/project/` (kintsugi identity kit, source of truth) vs.
what's actually landed in `secure-pride/docs/brand/` and the live site
(`secure-pride/src/`, `secure-pride/public/`).

## Landed / matches

- **`design-system-v2.jsx`** — byte-identical between
  `secure-pride-design/project/` and `secure-pride/docs/brand/`. Fully synced.
- **Primary mark** — `secure-pride/public/logo.svg` and
  `secure-pride-design/project/identity-kit/01_primary/brass_master.svg` are
  the same shield (`viewBox 0 0 1024 1024`, same gradient stops, same
  `aria-label="Secure Pride — Heart-Lock Shield"`). The brass mark is live.
- **Kintsugi color tokens** — `src/styles/tokens.css` carries the full
  brass/indigo/fire-opal palette as `--sp-*` primitives and `--kintsugi-*`
  semantic tokens, and `tailwind.config.ts` mirrors it under `colors.kintsugi`.
  Both are explicitly namespaced/additive so they don't collide with the
  live palette. This is a deliberate landing-in-progress, not a gap — see
  tokens.css's own header comment.

## Gaps

1. **Kintsugi palette imported but unused.** `grep -rl kintsugi src/` matches
   only `tokens.css` itself — no component consumes `--kintsugi-*` or
   `theme.colors.kintsugi`. Every live component (`Hero.astro`, `Header.astro`,
   etc.) still renders on the old palette (`--color-neon-*`,
   `theme.colors.neon`/`brand`/`dark`) sourced from `global.css`'s inline
   `:root` block and `tailwind.config.ts`'s `neon`/`brand`/`dark` groups.
   The site is visually still the retired neon-cyberpunk direction; kintsugi
   exists in code but not on screen.

2. **`docs/brand/README.md` describes the retired palette as current.** Its
   "Design System" section states the "core palette" is
   `Teal #0a7e74, Purple #3a2a5e, Cyan #06d6e0, Pink #ff2d95` — that's the
   neon set `tokens.css`'s own header comment calls "the retired
   neon-cyberpunk direction." This is doc rot: the file describes what's
   live today by accident (since kintsugi hasn't shipped to components yet),
   but frames it as the intentional brand, with no mention that kintsugi is
   the successor direction already sitting in the codebase. Holding off on
   fixing this in-place because the correct fix depends on the phase 4
   decision (does the site actually adopt kintsugi, or is neon staying?) —
   flagging here rather than silently rewriting a doc whose accuracy depends
   on an unmade call.

3. **Favicon set incomplete.** The identity kit ships a full set
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

4. **UI kit (`ui_kits/web/`) is a prototype, not integrated.** It's a
   standalone `index.html` (landing, audit dashboard, report view,
   settings/profile screens) documented as "derived from
   `docs/brand/design-system-v2.jsx`" but never wired into the live Astro
   site — no audit dashboard, report view, or settings screens exist in
   `secure-pride/src/pages` or `src/components` today. This is expected
   (the live site is marketing-only, no authenticated product surface yet)
   but worth naming explicitly for the phase 4 strategy doc: the kit is
   further ahead of the product than the product is.

5. **Repo-name rot inside `secure-pride-design`, not fixed here.**
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
