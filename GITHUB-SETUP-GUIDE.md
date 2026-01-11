# GitHub Repository Setup Guide: Copilot Instructions

This guide explains how to organize the Secure Pride copilot instructions in your GitHub repository at `secure-pride/secure-pride`.

---

## Files Included

You now have three production-ready markdown files:

### 1. **COPILOT-INSTRUCTIONS.md** (Main Document)
- **Length**: ~2,800 words
- **Purpose**: The authoritative charter defining all operational standards
- **Audience**: AI systems, team members, code reviewers
- **Location in repo**: `docs/COPILOT-INSTRUCTIONS.md` or root as `COPILOT-INSTRUCTIONS.md`

**Contents**:
- Executive Summary (1 min read)
- Core Philosophy: Mindful Development (6-step cycle)
- Autonomous Build Agency & Authority Matrix
- Security Standards: Privacy-First Mandate + SOGI Data Protection
- SWE-bench Code Quality Verification
- Memory & Context Retention Architecture
- Accessibility & Neurodiversity Standards
- Iterative Refinement Process
- Decision Documentation Template
- Quick-Access Authority Matrix
- Version History
- Contributing Guidelines

---

### 2. **COPILOT-INSTRUCTIONS-README.md** (Orientation & Usage)
- **Length**: ~800 words
- **Purpose**: Explains what the document is, how to use it, and how to keep it current
- **Audience**: Team members new to Secure Pride, reviewers, decision-makers
- **Location in repo**: Same directory as COPILOT-INSTRUCTIONS.md, or in `docs/README.md`

**Contents**:
- Overview: What this is and isn't
- Quick Start: Which sections to read first
- Using the Document: For AI, humans, and code reviews
- Key Concepts Explained: Authority matrix, SOGI data, accessibility, SWE-bench
- Decision Documentation Process
- How to Update the Charter
- Version History
- Questions/Links

---

### 3. **QUICK-REFERENCE.md** (One-Page Cheat Sheet)
- **Length**: ~600 words
- **Purpose**: Rapid lookup during development; printable checklist
- **Audience**: Developers, reviewers, AI systems during active work
- **Location in repo**: `docs/QUICK-REFERENCE.md` or prominently linked

**Contents**:
- Mindful Development Cycle (condensed)
- Authority Matrix (quick lookup table)
- SWE-bench Verification Checklist (8 items)
- Security Standards Checklist (Privacy, SOGI, Auth, Encryption)
- Accessibility Checklist
- Error Recovery Process
- Decision Template (condensed version)
- Escalation Protocol
- Key Principles (one-liners)
- Common Commands
- Bookmarks

---

## Recommended Directory Structure

```
secure-pride/
├── README.md (main repo readme)
├── SECURITY.md (security reporting guidelines)
├── CONTRIBUTING.md (contribution guidelines, link to copilot instructions)
├─┠─ docs/
│  ├── COPILOT-INSTRUCTIONS.md (the main charter)
│  ├── COPILOT-INSTRUCTIONS-README.md (how to use the charter)
│  ├── QUICK-REFERENCE.md (one-page reference card)
│  ├── README.md (documentation index)
│  └── decisions/ (decision records)
│     ├── DECISION-001.md
│     ├── DECISION-002.md
│     └── README.md (index of decisions)
├── src/
├── tests/
└─┠─ .github/
   ├── ISSUE_TEMPLATE/
   ├── PULL_REQUEST_TEMPLATE.md
   └── workflows/
```

---

## Step-by-Step Setup

### Step 1: Copy Files to Repository

```bash
# Clone your secure-pride repository
git clone https://github.com/secure-pride/secure-pride.git
cd secure-pride

# Create docs directory if it doesn't exist
mkdir -p docs/decisions

# Copy the three instruction files
cp /path/to/COPILOT-INSTRUCTIONS.md docs/
cp /path/to/COPILOT-INSTRUCTIONS-README.md docs/
cp /path/to/QUICK-REFERENCE.md docs/

# Create an initial README for the docs directory
cat > docs/README.md << 'EOF'
# Secure Pride Documentation

## Copilot Instructions

Operational standards for AI-assisted development.

- **[COPILOT-INSTRUCTIONS.md](COPILOT-INSTRUCTIONS.md)**: Full charter
- **[COPILOT-INSTRUCTIONS-README.md](COPILOT-INSTRUCTIONS-README.md)**: How to use the charter
- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)**: One-page cheat sheet

## Decision Records

Significant decisions are recorded in [decisions/](decisions/).
EOF

# Create an initial README for decisions
cat > docs/decisions/README.md << 'EOF'
# Decision Records

This directory contains significant decisions that shaped Secure Pride's architecture,
data handling, security practices, and organizational policies.

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
EOF
```

### Step 2: Update Main README.md

Add a reference to the copilot instructions in your main `README.md`:

```markdown
## Development

For information on how to work with AI assistants at Secure Pride, see:

- **[Copilot Instructions](docs/COPILOT-INSTRUCTIONS.md)**: Standards for AI-assisted development
- **[Quick Reference](docs/QUICK-REFERENCE.md)**: One-page cheat sheet during development

These documents define how we approach security, accessibility, code quality, and decision-making.
```

### Step 3: Update CONTRIBUTING.md (or Create It)

Add this section to your contribution guidelines:

```markdown
## Standards & Expectations

All work at Secure Pride follows the [Copilot Instructions](docs/COPILOT-INSTRUCTIONS.md), which define:

- **Code Quality**: SWE-bench Verified standard (see [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md))
- **Security**: Privacy-first mandate, SOGI data protection, encryption by default
- **Accessibility**: Built in from day one, not as afterthought
- **Decision-Making**: Documented decisions in [decisions/](docs/decisions/)

### Code Review Checklist

When reviewing code, verify:
- [ ] Verification checklist passed (Part 4 of Instructions)
- [ ] Security standards met: encryption, no telemetry, SOGI protection (Part 3)
- [ ] Accessibility standards applied (Part 6)
- [ ] Edge cases and error handling included
- [ ] Tests provided and passing

### Decision Documentation

For significant decisions:
1. Create a decision file in `docs/decisions/` using the template
2. Reference it in pull requests and code comments
3. Update the decision once implementation is complete

See [Decision Records](docs/decisions/) for examples.
```

### Step 4: Commit and Push

```bash
# Stage all new files
git add docs/

# Commit with clear message
git commit -m "Add Secure Pride Copilot Instructions and documentation

- COPILOT-INSTRUCTIONS.md: Authoritative charter for AI-assisted development
- COPILOT-INSTRUCTIONS-README.md: Usage guide and explanation
- QUICK-REFERENCE.md: One-page cheat sheet for developers
- docs/decisions/README.md: Decision record framework

These documents define standards for security, accessibility, code quality,
and decision-making across all Secure Pride projects.

See docs/COPILOT-INSTRUCTIONS-README.md for more information."

# Push to GitHub
git push origin main
```

### Step 5 (Optional): Create GitHub Wiki Pages

If your organization uses GitHub wiki, you can mirror key sections there:

```bash
git clone https://github.com/secure-pride/secure-pride.wiki.git
cd secure-pride.wiki

# Copy key sections to wiki for searchability
cp /path/to/COPILOT-INSTRUCTIONS.md Home.md
cp /path/to/QUICK-REFERENCE.md Quick-Reference.md

git add .
git commit -m "Add Copilot Instructions to wiki"
git push
```

---

## Using the Files

### For AI Assistants (Perplexity, ChatGPT, Claude)

1. **Copy the full text** of `COPILOT-INSTRUCTIONS.md`
2. **Paste into your system prompt** or custom instructions
3. **Add project context** (repo structure, team, current task)
4. **Proceed with work**

**Example prompt**:
```
You are an AI assistant for Secure Pride, a cybersecurity organization
focused on protecting LGBTQ+ communities.

Repository: https://github.com/secure-pride/secure-pride
Current project: Ally Platform (privacy-first communication tool)

Follow these operational standards:

[Paste full COPILOT-INSTRUCTIONS.md text here]

Now, here's what I need help with:
[Your request]
```

### For Team Members

1. **Read** COPILOT-INSTRUCTIONS-README.md on first day
2. **Bookmark** QUICK-REFERENCE.md for development work
3. **Consult** Authority Matrix when decisions come up
4. **File** decision documents for significant choices
5. **Propose updates** via pull request with decision record

### For Code Review

1. **Check** SWE-bench verification checklist (Part 4, QUICK-REFERENCE.md)
2. **Verify** security standards: encryption, no telemetry, SOGI data handling
3. **Confirm** accessibility standards applied
4. **Reference** relevant decision documents in review comments

---

## Maintaining the Document

### Quarterly Review

Every quarter, review:
- [ ] Are all decision files linked and archived?
- [ ] Are standards still accurate?
- [ ] Any new threats or challenges?
- [ ] Any accessibility or privacy gaps discovered?
- [ ] Need for new guidance or clarification?

### Version Bumping

When you update COPILOT-INSTRUCTIONS.md:

1. Update the version number in the document (top section)
2. Add entry to Version History
3. Create a decision file explaining the change
4. Submit pull request with decision file
5. After merge, update version history in README

**Example version update**:
```markdown
| Version | Date | Changes |
|---|---|---|
| 2.0 | 2026-01-09 | Added escalation framework, SOGI protection, memory architecture, accessibility standards, decision documentation, iterative refinement |
| 2.1 | 2026-03-15 | Clarified SOGI data expiration policies; added multi-device key sync guidance |
```

---

## Linking from Other Documents

### In Code Comments

```javascript
// See COPILOT-INSTRUCTIONS.md Part 3: Security Standards
// for why we use AES-256-GCM encryption
const encryptionAlgorithm = 'AES-256-GCM';

// DECISION-001: End-to-End Encryption for Direct Messages
function encryptMessage(plaintext, userKey) {
  // implementation
}
```

### In Pull Request Descriptions

```markdown
## Changes

Implements DECISION-002: Client-Side Key Derivation

See [docs/decisions/DECISION-002.md](docs/decisions/DECISION-002.md) for full context.

This change ensures encryption keys are derived on the client and never transmitted
to the server, following COPILOT-INSTRUCTIONS.md Part 3: Security Standards.
```

### In GitHub Issues

```markdown
## Issue: How should we store user pronouns?

This touches on SOGI data handling. Before implementing, review:
- [COPILOT-INSTRUCTIONS.md Part 3](docs/COPILOT-INSTRUCTIONS.md#part-3-security-standards-privacy-first-mandate)
- [QUICK-REFERENCE.md SOGI Data section](docs/QUICK-REFERENCE.md#sogi-data-sexual-orientation--gender-identity)

File a decision record before coding.
```

---

## FAQ

**Q: Where should these files live?**  
A: Recommend `docs/` directory. You can also place `COPILOT-INSTRUCTIONS.md` in the root if you want maximum visibility.

**Q: Can I modify these files?**  
A: Yes, absolutely. Use the decision documentation process to propose and record changes.

**Q: Do I need all three files?**  
A: No, but they serve different purposes:
- COPILOT-INSTRUCTIONS.md = authoritative reference (everyone should read)
- COPILOT-INSTRUCTIONS-README.md = orientation guide (new team members)
- QUICK-REFERENCE.md = development checklist (keep open while coding)

**Q: How often should we update?**  
A: Review quarterly. Update as needed when you discover gaps or new patterns.

**Q: What if there's a contradiction between documents?**  
A: COPILOT-INSTRUCTIONS.md is authoritative. QUICK-REFERENCE.md and README.md must be consistent with it. File a decision if you spot an error.

---

## Next Steps

1. **Copy files** to your repository structure
2. **Update README.md** and CONTRIBUTING.md with links
3. **Create docs/decisions/README.md** to initialize decision records
4. **Commit and push** with clear commit message
5. **Brief team**: Share links and explain key concepts
6. **Bookmark**: Everyone bookmarks QUICK-REFERENCE.md
7. **Start using**: File first decision document for any current work

---

**Questions? Start with [COPILOT-INSTRUCTIONS-README.md](COPILOT-INSTRUCTIONS-README.md).**

*Secure Pride: Privacy-first cybersecurity for LGBTQ+ communities.*
