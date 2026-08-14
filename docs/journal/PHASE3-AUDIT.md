# Phase 3: Positioning Audit

The pitch deck's narrative (`sp-cd-push/docs/brand/secure-pride-community-deck.pptx`,
9 slides) vs. each repo's own self-framing — `secure-pride` (live site),
`secure-pride-design`, `macos-privacy`, `wireshark-beginner-kit`.

## The pitch deck's narrative

Secure Pride is a security scanner that sits between an organization and the
AI tools it uses. It catches hidden prompt-injection attacks before they
reach the AI provider, automatically masks sensitive data (names, health
info, credentials), and shows a plain-language dashboard. Built by a queer
cybersecurity researcher (financial-sector background) for organizations
he's personally connected to — the HIV clinic he goes to, the sports league
he and his husband run, advocacy groups in hostile states. Explicitly
**early-stage**: "The scanner works. It's been built and tested... What I
don't have yet is organizations using it in the real world." The ask is 20
minutes, honest feedback, and a free month's trial — not funding, not a
commitment. Founder: Mazze LeCzzare Frazer, Durham NC.

## Findings

1. **`secure-pride` (live site) matches the deck's *product* description,
   but contradicts its *maturity*.** Hero/WhatWeDo describe the same
   AI-conversation scanner as the deck almost verbatim — "eight types of
   prompt injection attacks... eight categories of sensitive data," the
   same audience (community orgs, named examples: a queer youth
   organization, a gender-affirming health clinic), the same
   differentiators (open source, self-hostable, free for <10 staff, founder
   story). But `Pricing.astro` declares "This isn't a trial. This is the
   product," a live $200/month "Organization" tier, and a Docker Hub image
   — with no beta/pilot/early-access language anywhere on the site. The
   deck says "I need pilot organizations to tell me if this works in the
   real world"; the site says the product already ships and is priced.
   Anyone who sees both gets two different answers to "is this ready?"

2. **The self-hosting claim doesn't hold up against the codebase.** The
   scanner UI (`src/components/tools/AISafetyScanner.tsx`) calls
   `fetch("/api/scan")`, implemented at `functions/api/scan.ts` using
   Cloudflare's `PagesFunction`/`onRequestPost` convention — a
   Pages-Functions-specific runtime. The repo's own `Dockerfile` builds a
   static-only image (Astro build → plain nginx) and its own comment states
   it deliberately excludes `functions/` from the build context ("avoids
   pulling unrelated top-level files... into the build stage"). So the
   exact command `WhatWeDo.astro` instructs people to run —
   `docker run -p 8080:80 securepride/secure-pride` — serves a site whose
   own scan endpoint 404s. The scanner only runs on Cloudflare Pages today;
   "self-hosted... runs on your own computers... we never see your data"
   (the deck's slide 5, echoed on the live site's trust bar) isn't true for
   that deployment path as shipped. This is a factual, verifiable gap, not
   a messaging-tone one — worth prioritizing over the positioning
   inconsistency above, since a technically literate contact (exactly who a
   nonprofit or IT-aware org would send to evaluate this) can disprove it
   in under five minutes by following the site's own instructions.

3. **`secure-pride-design` describes a different, broader org entirely.**
   Its framing is a five-product "sovereignty stack": an Audit Toolkit
   (DNS/TLS/email-auth/CSP/secrets scanning), an Ally Web App (E2EE
   chat/identity tools), a Document Engine, a blog/editorial platform, and
   a "Praxis Stack" (identity switcher, ContextSynapse). No mention of an
   AI-conversation scanner, prompt injection, or data masking anywhere —
   the one specific, built, pitched, and live product doesn't appear in the
   design system's own description of what Secure Pride does. The tagline
   matches ("Where we draw the line online.") but the substance underneath
   it is a different company. This is the single largest gap in the whole
   audit: the repo responsible for how the brand *looks* doesn't know what
   the brand currently *is*.

4. **`macos-privacy` carries no Secure Pride branding or cross-reference at
   all.** It self-describes as a personal, ADHD-friendly macOS
   dev-environment starter kit for individual developers (Objective-See
   tooling, an iPad Pro companion setup) — a different audience (individual
   power users, not organizations) and a different value prop entirely. It
   isn't currently claiming to be part of Secure Pride, so this isn't
   "drift" so much as "never joined" — a phase 4 question (does it belong
   under this umbrella at all, and if so, on what terms) rather than a
   correction.

5. **`wireshark-beginner-kit` offers a third characterization.** Its only
   Secure Pride reference is one line: "Part of the practical-security
   teaching work behind Secure Pride." That frames the parent project as an
   education/teaching umbrella — consistent with neither the AI-scanner
   narrative nor the sovereignty-stack narrative.

## Net picture

At least three, arguably four, incompatible self-descriptions of what
Secure Pride *is* exist at once: an AI-conversation scanner for LGBTQ+
community orgs (deck + live site, though disagreeing with each other on
maturity); a five-product privacy "sovereignty stack" (`secure-pride-design`);
a practical-security teaching umbrella (`wireshark-beginner-kit`); and one
repo with no relationship to any of it (`macos-privacy`). Layered on top:
one concrete, checkable false claim (the Docker self-host path doesn't run
the scanner it's presented as running).

This is the most decision-relevant material the audit has produced so far —
it bears directly on what story gets told to funders/sponsors, which is the
stated purpose of this whole consolidation effort (`PLAN.md`'s title:
"funder/sponsor offer"). Recommend phase 4's strategy doc treat "which
narrative is canonical, and is the live site allowed to say things the
product can't yet do" as the central question, not a subsection.

## Not decided here

Per `PLAN.md`'s constraints and this phase's read-only scope: no repo
restructuring, no README rewrites in `secure-pride-design`, `macos-privacy`,
or `wireshark-beginner-kit`, and no fix to the Docker self-hosting gap
(adding a real backend to the image, or caveating the claim) — that's a
product/infra call for phase 4 and the user's go-ahead, not something to
patch silently mid-audit.
