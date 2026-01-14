# Secure Pride - GitHub Copilot Instructions

## Organization Overview

**Secure Pride** provides privacy-first cybersecurity tools and services for LGBTQ+ communities.

- **Website**: https://securepride.org
- **Mission**: Privacy-first cybersecurity for LGBTQ+ communities
- **Focus**: Protecting sensitive personal information in hostile legal environments

## Quick Reference

For comprehensive development standards, see:

- **[Full Copilot Instructions](https://github.com/mazze93/Secure-Pride/blob/main/docs/COPILOT-INSTRUCTIONS.md)** - Complete operational framework
- **[Quick Reference](https://github.com/mazze93/Secure-Pride/blob/main/docs/QUICK-REFERENCE.md)** - One-page development cheat sheet

## Core Principles

### 1. Privacy-First Mandate
- No telemetry, no tracking, no third-party data sharing
- All data collection requires explicit business justification
- Encryption by default for all sensitive data

### 2. SOGI Data Protection (Critical)
SOGI (Sexual Orientation/Gender Identity) data exposure can result in harassment, violence, or death in hostile legal environments.

**Requirements:**
- At Rest: AES-256-GCM for all SOGI data
- In Transit: TLS 1.3+ for all network communication
- Key Management: Prefer client-side key derivation
- No Plaintext Logging: Never log SOGI data
- Absolute Prohibition: Never share SOGI data with external parties

### 3. Accessibility Built-In
- ADHD-accessible design patterns (low-cognitive-load)
- Sans-serif fonts, 1.5-2.0 line spacing
- High contrast (WCAG AA minimum: 4.5:1)
- Maximum 2-click navigation to any feature

### 4. Production-Ready Code
All code must meet SWE-bench Verified standard:
- Compiles without errors
- Handles edge cases gracefully
- Includes proper error handling
- Works with existing codebase
- No security vulnerabilities

## Decision Authority

### Tier 1: Fully Autonomous (No Escalation)
- Code architecture, refactoring, bug fixes
- Writing tests and documentation
- Security implementation following Secure Pride standards

### Tier 2: Conditional Autonomy (Document, Then Act)
- Data schema or persistence model changes
- Security/encryption/authentication decisions
- UX, accessibility, or interface changes
- Third-party service integration

### Tier 3: Requires Explicit Approval (Escalate)
- SOGI data handling decisions
- External system access requests (credentials, API keys)
- Third-party data sharing integrations
- Organizational direction decisions
- Deviation from security standards

## Development Standards

### Verification Checklist
Before finalizing code:
- ✅ Syntax: Compiles without errors
- ✅ Dependencies: Imports only available packages
- ✅ Edge Cases: Handles null, empty, boundary conditions
- ✅ Error Handling: Fails gracefully, no sensitive data in logs
- ✅ Security: No SQL injection, XSS, unencrypted transmission, credential leaks
- ✅ Accessibility: ADHD-accessible patterns applied
- ✅ Privacy: No telemetry or tracking

### Code Patterns
- Write production-ready code (no pseudo-code or scaffolding)
- Prefer client-side solutions to minimize server attack surface
- Use dependency injection patterns where appropriate
- Document complex logic and public APIs
- Write unit tests for business logic (table-driven when possible)

### Error Recovery
When builds fail:
1. **Analyze immediately**: Read error messages, stack traces, logs
2. **Identify root cause**: Missing dependency? Configuration error? Version incompatibility?
3. **Propose mindful fix**: Address underlying problem, not symptom
4. **Provide recovery steps**: Exact commands and verification checklist
5. **Document the learning**: Update docs to prevent recurrence

## Key Guidelines

1. **Follow privacy-first principles in all code**
2. **Prioritize SOGI data protection above all else**
3. **Write production-ready code that works immediately**
4. **Design for ADHD-accessible patterns**
5. **Test before suggesting** - verify capabilities exist
6. **Document significant decisions** using decision template
7. **Escalate when handling SOGI data** or security-critical decisions
8. **Maintain existing code structure** and conventions
9. **Minimize attack surface** - prefer client-side solutions
10. **Never compromise on encryption** or data protection

## Repository Resources

- **Documentation**: See `/docs` folder for full specifications
- **Decisions**: See `/docs/decisions` for architectural decision records
- **Contributing**: See `CONTRIBUTING.md` for contribution guidelines
- **Main Site**: https://securepride.org

## Contact & Support

- **Organization**: Secure Pride
- **Website**: https://securepride.org
- **Project Maintainer**: @mazze93
- **GitHub**: https://github.com/mazze93/Secure-Pride

---

*These instructions reflect the Secure Pride Stonewall Standard: uncompromising vigilance protecting marginalized communities.*

For complete details, see [docs/COPILOT-INSTRUCTIONS.md](https://github.com/mazze93/Secure-Pride/blob/main/docs/COPILOT-INSTRUCTIONS.md)
