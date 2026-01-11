# Secure Pride Copilot Instructions

## Overview

This directory contains **COPILOT-INSTRUCTIONS.md**, the operational framework for AI-assisted development at Secure Pride. The document establishes how AI tools should approach design decisions, security standards, code quality, and accessibility—while balancing autonomous decision-making with human oversight on sensitive issues.

## What This Document Is

A living charter that defines:

- **How we work**: Six-step Mindful Development cycle (Understand → Verify → Design → Build → Validate → Deploy)
- **What authority AI has**: Three-tier decision matrix (Autonomous, Conditional, Escalation Required)
- **What we protect**: Privacy-first mandate with explicit SOGI (Sexual Orientation & Gender Identity) data safeguards
- **What quality we demand**: SWE-bench Verified standard for all code
- **How we remember**: Short-term and long-term memory architecture
- **Who we serve**: Neurodivergent users and LGBTQ+ communities—built in from the start, not as afterthought

## What This Document Is NOT

- A substitute for human judgment
- A permission slip to bypass security review
- A collection of best practices divorced from Secure Pride's mission
- A finished, unchanging standard

## Quick Start

If you're new to Secure Pride, read these sections first:

1. **Executive Summary** (1 min): High-level mission and principles
2. **Authority Matrix** (2 min): What you can decide independently vs. what needs approval
3. **Part 3: Security Standards** (5 min): What "privacy-first" means in practice
4. **Part 6: Accessibility Standards** (3 min): Why accessibility matters and what we check

## Using This Document

### For AI Assistants / Copilot Systems

This document is designed to be used as a **system prompt** or **custom instructions** for AI tools:

1. **Copy the full text** of `COPILOT-INSTRUCTIONS.md`
2. **Paste it into your AI system prompt** (Perplexity, ChatGPT, Claude, etc.)
3. **Prefix with project context** (repo structure, current codebase, team members)
4. **Proceed with work**: The AI will follow these standards autonomously

**Example**:
```
[Your project context here]

[Full COPILOT-INSTRUCTIONS.md text]

Now let's build Secure Pride's Ally platform. 
Current task: [your request]
```

### For Team Members / Human Decision-Makers

1. **Reference the Authority Matrix** (at the end) when decisions come up
   - Does this require a Decision File? A security review? Human approval?
2. **Use Part 8: Decision Documentation** when making significant choices
   - File decision documents in `decisions/` directory with sequential IDs
3. **Update this charter** when you discover gaps or new patterns
   - Propose changes via pull request with decision documentation

### For Code Review

When reviewing code generated with these instructions:

- Check that **verification checklist** (Part 4) was completed
- Confirm **security standards** (Part 3) are met: encryption, no telemetry, SOGI data protection
- Verify **accessibility standards** (Part 6) are embedded, not bolted on
- Ensure **error recovery** (Part 2) is documented if anything failed

## Key Concepts

### Mindful Development

A six-step cycle that emphasizes understanding before solving:

1. **Understand**: Define the problem, constraints, success criteria
2. **Verify**: Check that solutions are real, safe, privacy-preserving
3. **Design**: Create simple, secure, human-centered architecture
4. **Build**: Write production-ready code
5. **Validate**: Verify with exact commands before deployment
6. **Deploy**: Move to production with confidence

This cycle prevents:
- Building the wrong thing
- Suggesting non-existent APIs or libraries
- Implementing insecure or inaccessible solutions
- Shipping code with untested edge cases

### Three-Tier Authority Model

**Tier 1: Autonomous**
- Code architecture, refactoring, testing, tool recommendations
- No waiting; proceed independently

**Tier 2: Conditional Autonomy**
- Data schema changes, security decisions, UX/accessibility changes, third-party integrations
- Document your reasoning before proceeding (use Decision Template)

**Tier 3: Escalation Required**
- SOGI data handling, external system access, policy/legal questions, organizational direction
- **Wait for explicit approval before proceeding**

### SOGI Data Protection

Sexual Orientation & Gender Identity (SOGI) data is highest-risk personal information. Exposure can result in harassment, violence, discrimination, or death. Therefore:

- **Collect only when necessary** and make collection optional
- **Encrypt always**: AES-256 at rest, TLS 1.3+ in transit
- **Restrict access**: Only team members who absolutely need it
- **Delete promptly**: Set automatic expiration policies
- **Never share**: Absolute prohibition on third-party sharing, even with consent

### Low-Cognitive-Load Design

Accessibility is not a feature for disabled users—it benefits everyone. We build with ADHD/neurodiversity in mind:

- Modular, single-function components
- Predictable, consistent patterns
- Minimal decisions required per interaction
- Clear, direct language (no jargon)
- Sans-serif fonts, high contrast, dark mode options
- Navigation in two clicks or fewer

### SWE-bench Verified Standard

All code must be production-ready without modification:

- Correct syntax, handles edge cases, integrates with existing code
- Follows project conventions, minimizes dependencies
- Passes the **8-item verification checklist** (Part 4)

If code doesn't pass all checks, flag the limitation explicitly.

## Decision Documentation

For significant decisions, file a **Decision Document** in `decisions/` directory:

```
decisions/
  DECISION-001.md (End-to-End Encryption for Direct Messages)
  DECISION-002.md (Client-Side Key Derivation)
  DECISION-003.md (Minimum Data Collection)
  ...
```

Use the template in Part 8. Decision documents:
- Record **context**: What problem did this solve?
- List **options considered** with pros/cons
- Explain **rationale**: Why this choice aligns with our values
- Document **trade-offs**: What are we sacrificing?
- Include **outcome**: Did it work? What did we learn?

Link to relevant decisions from code comments, issues, and pull requests.

## Updating This Document

The charter is living—it evolves as we learn.

**To propose changes**:

1. Create a **Decision File** using Part 8 template
2. Explain: What gap does this close? Why now?
3. File a **pull request** with the decision and proposed changes
4. Get **review** from at least one maintainer
5. **Merge**: Decision file goes to `decisions/`; charter updates if applicable

**Example PR title**: 
> Update COPILOT-INSTRUCTIONS: Add decision-driven process for third-party integrations [DECISION-004]

## Version History

| Version | Date | Highlights |
|---|---|---|
| 1.0 | Original | Core philosophy, build agency, security standards, SWE-bench |
| 2.0 | 2026-01-09 | Added escalation framework, SOGI protection, memory architecture, accessibility standards, decision documentation, iterative refinement |

## Questions?

- **How do I report a security issue?** [Link to security.md]
- **How do I propose a feature?** [Link to contribution guidelines]
- **Who maintains this?** [Link to team or maintainers]

---

**Secure Pride: Privacy-first cybersecurity for LGBTQ+ communities.**

*Last updated: January 9, 2026*
