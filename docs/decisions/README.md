# Decision Records

This directory contains significant decisions that shaped Secure Pride's architecture, data handling, security practices, and organizational policies.

## File Naming

Decisions are named sequentially: `DECISION-001.md`, `DECISION-002.md`, etc.

## Format

Each decision file includes:
- Date and category (Security, Architecture, Accessibility, Privacy, SOGI Data Handling)
- Context: The problem being addressed
- Options considered with pros/cons
- Decision and rationale
- Implementation plan
- Outcome (updated after implementation)

## Linking

Reference decisions in:
- Code comments: `See DECISION-003 for encryption strategy`
- Pull requests: `Implements DECISION-002: Client-Side Key Derivation`
- Issue discussions: Link to relevant decision

## Proposing Changes to Instructions

To propose changes to COPILOT-INSTRUCTIONS.md:
1. Create a new decision file using the template
2. File a pull request with the decision
3. Get review from at least one maintainer
4. Merge decision file to decisions/
5. Update COPILOT-INSTRUCTIONS.md if applicable
