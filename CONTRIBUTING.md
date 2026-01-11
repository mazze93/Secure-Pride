# Contributing to Secure Pride

Thank you for your interest in contributing to Secure Pride! This document provides guidelines for contributing to the project.

## Standards & Expectations

All work at Secure Pride follows the [Copilot Instructions](docs/COPILOT-INSTRUCTIONS.md), which define:

- **Code Quality**: SWE-bench Verified standard (see [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md))
- **Security**: Privacy-first mandate, SOGI data protection, encryption by default
- **Accessibility**: Built in from day one, not as afterthought
- **Decision-Making**: Documented decisions in [decisions/](docs/decisions/)

## Code Review Checklist

Before submitting a pull request, ensure your code meets these standards:

### Security
- [ ] No external telemetry or tracking
- [ ] No unencrypted data storage or transmission
- [ ] SOGI data encrypted (AES-256-GCM at rest, TLS 1.3+ in transit)
- [ ] No credential leaks or hardcoded secrets
- [ ] Input validation on both client and server

### Code Quality (SWE-bench Verified)
- [ ] Correct syntax, compiles without errors
- [ ] Handles edge cases (null, empty, invalid input)
- [ ] Error handling with appropriate logging
- [ ] Would pass basic unit tests
- [ ] Follows project style and conventions
- [ ] Integrates with existing codebase

### Accessibility
- [ ] Clear, concise language (no jargon)
- [ ] Low-cognitive-load design
- [ ] Sans-serif fonts, high contrast
- [ ] Navigation in two clicks or fewer
- [ ] Keyboard accessible
- [ ] Screen reader compatible

## Authority Matrix

When making decisions during development:

| Decision Type | Can I Decide? | Must I Document? | Requires Approval? |
|---|---|---|---|
| Code architecture, refactoring | ✅ Yes | No | No |
| Data schema, security decisions | ⚠️ Conditional | **YES** | No (but document first) |
| UX, accessibility changes | ⚠️ Conditional | **YES** | No (but document first) |
| **SOGI data handling** | ❌ No | **YES** | **✅ YES—Wait for approval** |
| **External system access** | ❌ No | No | **✅ YES—Wait for approval** |

Full matrix in [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md).

## Decision Documentation

For significant decisions (Tier 2 or Tier 3 in the Authority Matrix), create a decision document:

1. Copy the template from the root directory or docs/
2. Fill in: Context, Options, Decision, Rationale, Implementation
3. Save as `docs/decisions/DECISION-NNN.md` (sequential numbering)
4. Include in your pull request

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes following the standards above
4. Run verification checklist (see [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md))
5. Commit with clear, descriptive messages
6. Push to your fork
7. Submit a pull request with:
   - Clear description of changes
   - Reference to any decision documents
   - Verification checklist confirmation

## Questions?

- Review [COPILOT-INSTRUCTIONS.md](docs/COPILOT-INSTRUCTIONS.md) for detailed guidance
- Check [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md) for quick answers
- Reach out to maintainers if still unclear

Thank you for helping build privacy-first cybersecurity for LGBTQ+ communities!
