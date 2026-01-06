# Module 3: Applied Development Workflows

## Overview

Theory meets practice. This module teaches three critical development workflows using Spaces: structured debugging, feature scaffolding, and terminal-based development. You'll learn how to transform vague bug reports into documented fixes, how issues become requirement context, and how to integrate Spaces into CLI workflows.

**In this module**, you'll learn:
- Implement a 7-step debugging workflow using Spaces
- Execute feature scaffolding by adding issue context for implementation planning
- Configure Copilot CLI with MCP server integration
- Understand the difference between reactive AI and agentic capabilities

**Why this module matters**: These workflows turn Spaces from "interesting tool" into "daily workflow accelerator." Teams using structured workflows report 50-70% faster bug resolution and clearer feature implementation plans.

**What you'll build**: Working knowledge of three production workflows you can use immediately.

**Prerequisites**:
- Module 1: Understanding Context Engineering
- Module 2: Creating and Configuring Spaces
- Command-line comfort for CLI workflows

**Time commitment**: 
- Lecture: 30 minutes
- Exercises: 40 minutes
- **Total: 70 minutes**

---

## Workflow 1: The 7-Step Debugging Process

Debugging with Spaces transforms chaotic bug hunting into systematic problem-solving.

### The Problem Without Structure

**Typical debugging chaos**:
1. Bug report filed: "Login doesn't work sometimes"
2. Developer investigates manually (30 minutes lost)
3. Asks AI for help: "How do I fix login?"
4. AI gives generic JWT validation code
5. Developer realizes AI doesn't understand the codebase
6. Manual fix (another hour)
7. No documentation of what was learned

**Total time**: 90+ minutes. **Knowledge captured**: Zero.

---

### The 7-Step Structured Workflow

#### Step 1: Create a Debugging Space

**Action**: Create a Space named after the issue (e.g., "Issue-42-Auth-Debug")

**Why**: Centralizes all debugging context in one place. Makes debugging reproducible.

---

#### Step 2: Add the Issue as Context

**Action**: 
- Copy the GitHub issue URL
- Paste into Space ("Add issue")
- Copilot auto-syncs title, description, comments, status

**What this provides**:
- User-reported symptoms
- Steps to reproduce
- Expected vs. actual behavior
- Discussion thread with additional context

**Example issue**:
```
Title: Unsafe usage of check_call in deployment script
Description: The deployment script uses subprocess.check_call() with 
shell=True, which poses a security risk if user input is involved.
```

---

#### Step 3: Add Security Docs or Design Patterns

**Action**: Add relevant documentation
- OWASP guidelines for subprocess security
- Your team's security policy
- Design patterns for safe command execution

**Why**: Grounds AI suggestions in authoritative sources. Prevents hallucinated "best practices."

---

#### Step 4: Ask Copilot to Debug

**Prompt example**:
```
Based on Issue #42 and the security documentation in this Space, 
identify the vulnerability in our deployment script. Explain the 
security implications and reference OWASP guidelines.
```

**What happens**: Copilot analyzes:
- Issue description (the problem)
- Code files (the implementation)
- Security docs (the standards)

---

#### Step 5: Review Copilot's Plan

**Copilot generates**:
1. Root cause analysis (cites specific file + line number)
2. Security implications (references OWASP)
3. Step-by-step fix plan
4. Before/after code comparison

**Your job**: Evaluate the plan
- ✅ Does it address the reported issue?
- ✅ Are file citations correct?
- ✅ Does the fix align with security docs?
- ✅ Are there edge cases to consider?

**This is the approval gate.** Don't skip it.

---

#### Step 6: Approve and Execute

**If plan is good**:
- Approve the approach
- Trigger coding agent (agentic capability)
- Agent generates PR with implementation

**If plan needs refinement**:
- Ask follow-up questions
- Request alternative approaches
- Add more context if needed

---

#### Step 7: PR with Documentation

**Coding agent generates**:
- Pull request with fix implementation
- Before/after diffs clearly marked
- Commit message explaining the change
- References to:
  - Original issue (#42)
  - Security documentation used
  - OWASP category addressed

**Result**: Documented, reviewable, traceable fix.

---

### Real Example Walkthrough

**Issue**: Unsafe `subprocess.check_call()` usage

**Step 1-3**: Space created with:
- `scripts/deploy.sh`
- `scripts/utils.py` (contains vulnerable code)
- Issue #42 URL
- OWASP guidelines on command injection

**Step 4**: Prompt: "Identify the vulnerability and propose a fix."

**Step 5**: Copilot responds:
```
Vulnerability found in scripts/utils.py, line 23:

subprocess.check_call(f"git pull {user_branch}", shell=True)

Security issue: Command injection (OWASP A03:2021 Injection)
- user_branch is untrusted input
- shell=True enables command chaining with ; && ||
- Attacker could inject: "main; rm -rf /"

Recommended fix: Use list-based arguments, disable shell:
subprocess.check_call(["git", "pull", user_branch])
```

**Step 6**: Approve approach

**Step 7**: PR generated with:
- Fixed code (list-based arguments)
- Unit test demonstrating injection is blocked
- Documentation explaining the change
- References to Issue #42 and OWASP A03

**Time saved**: 90 minutes → 20 minutes  
**Knowledge captured**: Complete fix history with rationale

---

## Workflow 2: Feature Scaffolding with Issues

Issues aren't just bug trackers—they're requirement context for feature development.

### The Requirement-Driven Approach

**Traditional approach**:
- Read feature request
- Manually outline implementation
- Start coding without clear plan
- Realize halfway through you misunderstood requirements

**Spaces approach**:
- Add issue to Space (requirements + acceptance criteria)
- Add relevant code files (where feature will live)
- Ask AI for implementation plan
- Refine plan before writing code

---

### Example: Building a Rate Limiting Feature

**Issue #67**: "Add rate limiting to public API endpoints"
```
Requirements:
- 100 requests per minute per IP
- Return 429 status when exceeded
- Include Retry-After header
- Whitelist internal IPs

Acceptance criteria:
- Works with existing Express middleware
- Redis-backed (not in-memory)
- Configurable limits per endpoint
```

---

**Step 1: Create Feature Space**

Name: "Feature-67-Rate-Limiting"

**Step 2: Add Context**
- Issue #67 URL (requirements)
- `middleware/` directory (where rate limiter goes)
- `routes/api.js` (endpoints to protect)
- `config/redis.js` (Redis connection patterns)
- Similar feature: `middleware/auth.js` (pattern reference)

**Step 3: Ask for Implementation Plan**

Prompt:
```
Based on Issue #67 requirements, design a rate limiting middleware 
that integrates with our existing Express app. Outline the approach.
```

**Step 4: Copilot's Plan**

```
Implementation Plan for Rate Limiting Middleware

1. Create middleware/rateLimit.js:
   - Import redis connection from config/redis.js
   - Use sliding window counter pattern
   - Key format: "ratelimit:{ip}:{endpoint}"
   - Configurable limits via options object

2. Integration points:
   - Export rateLimiter(options) factory function
   - Apply to routes in routes/api.js
   - Add Redis error handling (fail open vs. fail closed?)

3. Response handling:
   - Return 429 with Retry-After header
   - Include remaining requests in X-RateLimit-Remaining header
   - Log rate limit violations

4. Testing strategy:
   - Unit tests: Redis key logic
   - Integration tests: Actual request throttling
   - Load tests: Verify 100 req/min enforcement

5. Configuration:
   - Whitelist in config/rateLimit.js
   - Per-endpoint limits via route options
   - Default to 100/min if not specified

Questions before implementation:
- Fail open (allow on Redis error) or fail closed (deny)?
- Log every rate limit hit or only violations?
- Need monitoring/alerting integration?
```

**Why this is valuable**:
- Identifies integration points (Redis config, route structure)
- Raises critical questions before coding starts
- Provides testing strategy upfront
- Learned from existing patterns (auth middleware)

---

**Step 5: Refine the Plan**

You respond:
```
Fail closed on Redis error—security-critical. Log only violations.
Monitoring integration: Emit metric to DataDog on 429 responses.
```

**Step 6: Implementation**

Copilot generates:
- `middleware/rateLimit.js` following the plan
- Updates to `routes/api.js` applying middleware
- Unit and integration tests
- Configuration file with whitelist

**Result**: Feature built to spec, with clear rationale for decisions, before writing code.

---

## Agentic vs. Reactive AI

Understanding the distinction helps you know when AI can act autonomously vs. when it just advises.

### Reactive AI (Traditional)

**What it does**: Answers questions, suggests code, provides explanations

**Workflow**:
1. You ask: "How do I implement rate limiting?"
2. AI responds: "Here's an example..."
3. You copy, paste, modify
4. You create files, write code, commit

**Control**: You execute everything manually

---

### Agentic AI (Copilot with Spaces)

**What it does**: Plans, executes multi-step tasks, generates PRs

**Workflow**:
1. You ask: "Implement rate limiting per Issue #67"
2. AI responds: "Here's my plan... [detailed outline]"
3. You approve: "Yes, proceed"
4. AI executes: Creates files, writes code, generates tests, makes PR
5. You review: Approve or request changes

**Control**: You approve before execution, preview every change

---

### Key Difference: Autonomy with Approval

**Agentic ≠ Uncontrolled**

You maintain full control through explicit approval gates:
- ✅ Preview the plan before execution
- ✅ Review generated code before commit
- ✅ Approve PR before merge

**What agentic saves**: Manual execution of well-defined plans

**What you still do**: Strategic decisions, plan approval, code review

---

## Workflow 3: Terminal-Based Development with CLI

For developers who live in the terminal, context switching to a browser or IDE breaks flow. Copilot CLI brings AI assistance into your terminal environment.

### Why CLI Integration Matters

**The context-switching problem**:
1. Working in terminal
2. Need AI help
3. Switch to browser/IDE
4. Ask question
5. Switch back to terminal
6. Try to remember the answer

**CLI solution**: Stay in terminal, access Spaces directly.

---

### Copilot CLI Capabilities

**What it can do**:
- Access Spaces via MCP (Model Context Protocol)
- Read repository files
- Edit code files
- Run commands
- Execute multi-step workflows
- Generate commits and PRs

**What makes it powerful**: Full agentic capabilities in terminal, with preview before every action.

---

### Setting Up CLI with MCP Integration

#### Step 1: Install Copilot CLI

```bash
# Install via npm
npm install -g @github/copilot-cli

# Or via Homebrew (macOS)
brew install github/gh/gh-copilot
```

#### Step 2: Authenticate

```bash
gh auth login
# Follow prompts to authenticate with GitHub
```

#### Step 3: Configure MCP Server

Create or edit `~/.copilot/config.json`:
```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.github.com/mcp",
      "auth": "token"
    }
  }
}
```

This connects CLI to your GitHub Spaces via MCP protocol.

---

### Using CLI with Spaces

#### Example 1: Query a Space

```bash
# List available Spaces
gh copilot spaces list

# Select a Space for context
gh copilot spaces use "Feature-67-Rate-Limiting"

# Ask questions with Space context
gh copilot ask "How is authentication handled in this codebase?"

# Copilot searches Space context and responds with file citations
```

---

#### Example 2: Debug with CLI

```bash
# Use the debugging Space
gh copilot spaces use "Issue-42-Auth-Debug"

# Run tests
npm test

# Ask about failures with Space context
gh copilot ask "Why is auth.test.js failing? Here's the output: [paste]"

# Copilot analyzes using Space context (code + issue + security docs)
```

---

#### Example 3: Execute Workflow

```bash
# Multi-step debugging workflow
gh copilot task "Debug and fix the authentication issue in Issue #42"

# Copilot generates plan:
# 1. Analyze code in scripts/utils.py
# 2. Identify unsafe subprocess call
# 3. Generate fix using list-based arguments
# 4. Update tests
# 5. Create PR

# Preview each step, approve to proceed
```

---

### MCP Protocol: The Bridge

**Model Context Protocol** enables communication between:
- **Copilot CLI** (the client)
- **GitHub Spaces** (the context repository)
- **Your terminal** (the execution environment)

**How it works**:
```
Terminal → CLI → MCP Server → Space (retrieves context)
Terminal ← CLI ← MCP Server ← Space (returns relevant files)
```

**Key advantage**: Spaces aren't just web UI—they're API-accessible context stores.

---

### CLI Limitations and Considerations

**Current limitations**:
- Spaces containing only a repository (no mixed content) may have restricted IDE access via MCP
- CLI access patterns differ slightly from IDE access
- Some agentic features require explicit enablement

**Best practices**:
- Test CLI access to your Spaces before relying on it
- Use mixed content types (repo + files + issues) for broadest compatibility
- Preview every action—CLI has full file system access

---

## 🛠️ Exercise 3.1: Execute the 7-Step Debugging Workflow

**What you'll practice**: Complete end-to-end debugging using structured workflow.

**Time**: 40 minutes

### Instructions

**Setup** (10 minutes):
1. Choose a codebase with a real or hypothetical bug
2. Create a GitHub issue describing the bug
   - Include: symptoms, steps to reproduce, expected vs. actual
3. Create a Space named after the issue

**Execute Workflow** (20 minutes):
4. Add the issue URL to your Space
5. Add 3-5 relevant code files
6. Add design docs or security guidelines (create sample if needed)
7. Write instructions: "You are a debugging assistant. Always cite file names and line numbers. Explain root cause before suggesting fixes."
8. Ask: "Analyze this issue and propose a fix"
9. Evaluate Copilot's response:
   - Does it cite correct files?
   - Is root cause analysis accurate?
   - Does fix align with guidelines?

**Document** (10 minutes):
10. Create a brief summary:
    - What was the issue?
    - How did Space context improve the debugging?
    - What would you do differently?

### Success Criteria

- ✅ Issue clearly describes problem
- ✅ Space includes issue + code + docs/guidelines
- ✅ Copilot's response cites specific files/lines
- ✅ Fix proposal is grounded in your context (not generic)
- ✅ You can explain how each context piece contributed

---

## Module Summary

You've completed Module 3! Here's what you learned:

✅ **7-step debugging workflow**: Structured approach from issue to documented PR  
✅ **Feature scaffolding**: Using issues as requirement context for implementation planning  
✅ **Agentic capabilities**: AI plans and executes with approval gates  
✅ **CLI integration**: Terminal-native development with MCP-connected Spaces  

### Key Takeaways

1. **Structure accelerates debugging**: 7-step workflow reduces bug resolution time by 50-70%
2. **Issues are requirement context**: Adding issues to Spaces enables requirement-driven development
3. **Agentic ≠ autonomous**: You maintain control through explicit approval gates
4. **CLI eliminates context switching**: Stay in terminal, access Spaces via MCP

### What's Next

In **Module 4: Team Adoption and Organizational Workflows**, you'll learn how to scale Spaces across teams. You'll build feedback loops from code reviews, create automated audit workflows, and design organization-wide knowledge bases.

### Before You Continue

- ✅ Complete the 7-step debugging exercise
- ✅ Identify one real bug in your projects to practice on
- ✅ Test CLI access to one of your Spaces (if applicable)

---

## Discussion Questions

**Question 1**: The 7-step workflow includes an explicit approval gate (Step 5: Review Plan). Some developers argue this slows them down. When would you skip the approval step, and what are the risks?

**Consider**:
- Severity of bug (production down vs. minor UI issue)
- Confidence in AI suggestion accuracy
- Blast radius of potential mistakes
- Time vs. safety tradeoffs

**Question 2**: Feature scaffolding relies on well-written issues. What makes an issue "good context" vs. "bad context" for AI planning?

**Consider**:
- Level of detail in requirements
- Presence of acceptance criteria
- Technical vs. business language
- Examples and counterexamples

---

## Workflow Cheat Sheet

### 7-Step Debugging
1. Create Space (named after issue)
2. Add issue URL
3. Add security docs/design patterns
4. Ask Copilot to debug
5. Review plan (approval gate)
6. Approve and execute
7. PR with documentation

### Feature Scaffolding
1. Create Space (named after feature)
2. Add issue URL (requirements)
3. Add relevant code files
4. Add similar existing features (patterns)
5. Ask for implementation plan
6. Refine plan with follow-up questions
7. Approve and implement

### CLI with Spaces
```bash
# List and select Space
gh copilot spaces list
gh copilot spaces use "Space-Name"

# Query with context
gh copilot ask "Your question"

# Execute workflow
gh copilot task "Multi-step task description"
```
