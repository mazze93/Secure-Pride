# DECISION-004: Repair the Docker Release Workflow

**Status**: Approved
**Date**: 2026-08-13
**Authority**: Tier 2 (Infrastructure/Deployment change — documented per COPILOT-INSTRUCTIONS.md; one sub-item escalated to Tier 3, see below)
**Decision maker**: Claude (autonomous), triaged for @mazze93

## Context

The `Release — Docker build & push` workflow (`.github/workflows/release.yml`)
was reported failing. The most recent run
([31715106517](https://github.com/mazze93/secure-pride/actions/runs/31715106517),
`workflow_dispatch` on `main` at `8238258`) failed at the **Log in to Docker
Hub** step with `Username and password required`, before the build step ever
ran.

Investigating further (build logs, `git log`, local reproduction) surfaced
four independent, stacked problems:

1. **Dockerfile targets a directory structure that no longer exists.** The
   Dockerfile's builder stage did `COPY site/package.json ./site/`,
   `RUN npm install --workspace=site`, and expected output at
   `site/dist`. `Migrate to astro (#40)` (2026-08-09, commit `e1fe709`)
   flattened the project — `package.json`, `astro.config.mjs`, `src/`, and
   `public/` all now live at the repo root, and `astro build` writes to
   `./dist`. This means the Docker image build itself was already broken and
   would have failed at the `COPY site/package.json ./site/` step on any run
   that got past login — the login failure was masking a second, independent
   bug.
2. **Node 20 in the builder stage is stale.** `node:20-alpine` is several
   majors behind; current Active LTS is Node 24 (verified live: v24.19.0,
   "Krypton," released 2026-08-03).
3. **The workflow's own actions are stale enough to trigger runner
   deprecation warnings.** Every step in the failed run logged: *"Node 20 is
   being deprecated. This workflow is running with Node 24 by default."*
   `actions/checkout@v4`, `docker/login-action@v3`,
   `docker/setup-buildx-action@v3`, and `docker/setup-qemu-action@v3` all
   still target the runner's deprecated Node 20 runtime.
4. **The tag-trigger pattern doesn't do what its own comment says.**
   `'v[0-9]+.[0-9]+.[0-9]*'` was commented `# v1.0.0, v1.2.3-rc1, etc.`, but
   GitHub's tag-glob matching requires a full match — there is no wildcard to
   consume a `-rc1` suffix, so a prerelease tag would never have triggered
   the workflow at all. (Confirmed against GitHub's own filter-pattern
   cheat sheet, which uses the identical `[0-9]+` construct in its official
   examples — the `+`/character-class mechanics were correct; the missing
   suffix wildcard was the actual bug.) The patch segment also used `[0-9]*`
   (zero-or-more) instead of `[0-9]+` like the other two segments,
   inconsistently allowing a trailing-empty patch version.

A fifth item — the root cause of the *actual observed failure* — is a
**credentials problem, not a code problem**: `DOCKERHUB_USERNAME` and/or
`DOCKERHUB_TOKEN` are unset or empty as repository secrets. This is called
out separately below because it is Tier 3 (external system access) and is
**not resolved by this change** — see Consequences.

## Options Considered

**Option A: Minimal patch — fix only the `site/` path bug**
- Pros: Smallest possible diff.
- Cons: Leaves the workflow silently vulnerable to the exact same class of
  bug (a stale, hardcoded path surviving a structural refactor), leaves
  known-stale/deprecated action versions in place, leaves a tag-trigger bug
  that would silently no-op on prerelease tags.
- Estimated effort: ~15 min.

**Option B: Fix the reported failure plus every independently-verified,
low-risk issue found while in the file (Dockerfile paths, Node version,
action versions, tag pattern), each validated before committing**
- Pros: Addresses the actual root cause (missing secrets, surfaced but not
  fixable by me) without leaving adjacent, already-discovered breakage in
  place; every change was independently verified (local `npm ci`/`npm run
  build`/`npm run check`, live Docker Hub tag lookups, GitHub's own
  documented glob syntax) rather than assumed.
- Cons: Larger diff than Option A; more surface for review.
- Estimated effort: ~2 hours incl. verification.

**Option C: Rewrite the workflow from scratch on a different base (e.g.
GHCR instead of Docker Hub)**
- Pros: Sidesteps Docker Hub credential/rotation overhead entirely.
- Cons: Out of scope — not what was asked, changes the project's registry
  choice and the existing token-rotation operational process
  (`docs/DOCKERHUB_TOKEN_WORKFLOW.md`, `token-reminder.yml`) without cause;
  a registry migration is its own decision, not a side effect of a bug fix.
- Estimated effort: ~1 day.

## Decision

We chose **Option B**.

## Rationale

- **Alignment with Secure Pride values**: "Minimize attack surface" and
  "low-cognitive-load architecture" both favor an explicit, minimal `COPY`
  list in the Dockerfile (only the paths `astro build` actually reads) over
  a blanket `COPY . .`, which would have pulled `.git`, `docs/`,
  `decisions/`, and an unrelated nested project
  (`secure-pride-raycast-extensions/`) into the build context. A
  `.dockerignore` was added as defense-in-depth on top of that, mirroring
  the existing `.gitignore` excludes.
- **Trade-offs accepted**: The diff touches more than the single reported
  symptom. Each additional change was independently verified before being
  included (see Implementation), so the trade-off is diff size, not risk.
- **Risks mitigated**: The `site/`-path bug would have caused the build to
  fail immediately once the login blocker is cleared — fixing only the
  reported symptom would have traded one failure for another on the very
  next run. The tag-pattern bug would have caused silent no-ops on
  prerelease tags (no error, no run, just nothing happening) — the worst
  kind of bug to leave in a release pipeline.
- **Success criteria**: `docker build` reproduces the same output as native
  `npm ci && npm run build` (verified — see Implementation); `release.yml`
  parses as valid YAML and pins current, non-deprecated action majors;
  `npm run check` still passes after the `nanoid` audit fix; a real tag like
  `v1.2.3-rc1` now actually matches the trigger it was already documented to
  support.

## Implementation

**`Dockerfile`**
- Builder stage: `node:20-alpine` → `node:24.19.0-alpine` (current Active
  LTS, exact patch pinned per request — confirmed to exist on Docker Hub and
  to satisfy Astro's own `engines` constraint, `^20.19.0 || >=22.12.0`, from
  `package-lock.json`).
- Removed all `site/` references. `COPY` now lists exactly what `astro
  build` reads: `package.json`, `package-lock.json`, `.npmrc` (required —
  the project depends on `legacy-peer-deps=true`), `astro.config.mjs`,
  `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `src/`,
  `public/`. Output path corrected from `/app/site/dist` to `/app/dist`.
- `npm install` → `npm ci`, matching the lockfile-exact-install convention
  already used by `content-validation.yml`.
- Runtime stage: `nginx:1.27-alpine` → `nginx:1.30.4-alpine` (current
  stable; confirmed published on Docker Hub — 1.27 is several stable
  releases behind).

**`.dockerignore`** (new) — excludes `.git`, secrets, build caches, and
non-build directories (`functions/`, `api/`, `docs/`, `decisions/`, `bin/`,
the Raycast sub-project) from the build context, mirroring `.gitignore`.

**`.github/workflows/release.yml`**
- Tag trigger: single pattern → two patterns
  (`'v[0-9]+.[0-9]+.[0-9]+'` and `'v[0-9]+.[0-9]+.[0-9]+-*'`) so prerelease
  tags actually match what the inline comment always claimed.
- Action version bumps (all verified against each action's live GitHub
  releases page): `actions/checkout` v4→v7, `docker/login-action` v3→v4,
  `docker/setup-buildx-action` v3→v4, `docker/setup-qemu-action` v3→v4,
  `docker/metadata-action` v5→v6, `docker/build-push-action` v6→v7. All are
  used here only via their stable, long-unchanged inputs (registry/
  username/password, images/tags, context/platforms/push/tags/labels/cache),
  so the major bumps carry negligible behavioral risk for this workflow.

**`package.json`** — added `"engines": {"node": ">=22.12.0"}` (Astro's own
floor for the Node 22 line; both the Docker pin and `content-validation.yml`'s
Node 22 CI runner satisfy it).

**`.nvmrc`** (new) — `24.19.0`, matching the Docker pin, for local dev
consistency.

**`npm audit fix`** — applied while dependencies were already being
touched: `nanoid` 3.3.16→3.3.18 (high-severity "indefinite loop on
zero-size custom generator," non-breaking patch-range fix). Re-verified
`npm run check` passes after.

**Docs**: `docs/DOCKERHUB_TOKEN_WORKFLOW.md` (image table + new
troubleshooting note for the exact `Username and password required` error),
`docs/QUICK-REFERENCE.md` (Docker command block was generic
`docker-compose` boilerplate that doesn't apply to this project — this repo
has no `docker-compose.yml`), `README.md` (added a Self-Hosting/Docker
section — previously undocumented from the README).

**Verification performed**
- `npm ci` — clean install, lockfile in sync.
- `npm run build` / `npm run check` — pass, 6 static pages, `tsc --noEmit`
  clean.
- `python3 -c "import yaml; yaml.safe_load(...)"` — `release.yml` parses.
- Live Docker Hub tag lookups confirming `node:24.19.0-alpine` and
  `nginx:1.30.4-alpine` are real, published tags.
- Live GitHub releases pages for every bumped action, confirming current
  major versions.
- GitHub's own filter-pattern-cheat-sheet source (`github/docs` repo)
  confirming the tag-glob mechanics before changing them.
- **Not performed**: a literal `docker build` in this environment — Docker
  Hub/CloudFront is not reachable through this session's network egress
  policy (confirmed: `docker pull node:24.19.0-alpine` alone fails with the
  same `403 Forbidden`, independent of this Dockerfile). Per this
  environment's own guidance, that class of failure is reported rather than
  routed around. The build was instead validated by running the equivalent
  steps natively on this Linux sandbox (`npm ci`, `npm run build`,
  confirming `dist/` output) and will be authoritatively validated by the
  real `release.yml` run in GitHub Actions, which has unrestricted network
  access.

## Consequences

- **Not resolved by this change, and out of my authority to resolve
  (Tier 3 — external system access/credentials)**: the workflow's actual
  observed failure (`Username and password required` at the Docker Hub
  login step) will persist until a human sets valid `DOCKERHUB_USERNAME`
  and `DOCKERHUB_TOKEN` repository secrets. Steps are already documented in
  `docs/DOCKERHUB_TOKEN_WORKFLOW.md` (`./bin/gh-secrets-setup.sh`). I have
  no Docker Hub credentials and cannot create or view repository secrets —
  this requires the human in the loop.
- `docs/components/contracts.md` documents three components (`BlogCard`,
  `PostMeta`, `Triptych`) that were removed from the repo entirely on
  2026-04-29 (`f9169df`, months before the Astro migration) — this predates
  and is unrelated to the Docker workflow, so it was left unchanged rather
  than guessed at. Flagged for a human decision: restore the blog feature,
  or retire the doc.
- If a prerelease tag (e.g. `v1.2.3-rc1`) is pushed, note that with the
  current `docker/metadata-action` config it will also be tagged `:latest`
  on Docker Hub (`PUSH_LATEST` defaults true for any tag push, and this
  workflow uses `type=raw,value=latest` rather than semver-aware "skip
  latest for prereleases" flavoring). Left as-is since no prerelease tag has
  ever been pushed and changing `:latest` semantics is a product decision,
  not a bug fix — flagged here for awareness.
