# Module 2: Creating and Configuring Spaces

## Overview

Now that you understand context engineering principles, it's time to build a Github Copilot Space. This module covers the mechanics of Space creation: adding different context types, writing effective custom instructions, and configuring Spaces for specific workflows.

**In this module**, you'll learn:
- Create a GitHub Copilot Space with files, repositories, issues, and PRs
- Write custom instructions that enforce coding standards and prevent hallucinations
- Configure Spaces for different development tasks
- Understand what makes instructions effective vs. generic

**Why this module matters**: Creating effective Spaces is the practical application of context engineering principles. Well-configured Spaces accelerate development; poorly configured ones waste time.

**What you'll build**: Two complete Spaces—one for bug fixing, one with enforceable custom instructions.

**Prerequisites**:
- Module 1: Understanding Context Engineering
- Access to GitHub repositories (own projects or provided samples)
- GitHub Copilot license (any tier)

**Time commitment**: 
- Lecture: 20 minutes
- Exercises: 35 minutes
- **Total: 55 minutes**

---

## Creating Your First Space

### What Can Be Added as Context?

GitHub Copilot Spaces support multiple context types:

1. **Code files**: Select individual files from repositories
2. **Entire repositories**: Add full repos for broad coverage
3. **GitHub issues**: Paste issue URLs (auto-syncs titles, descriptions, comments, status)
4. **Pull requests**: Paste PR URLs (auto-syncs diffs, review comments, status)
5. **Documentation**: README files, architecture docs, API references
6. **Plain text notes**: Add custom notes, requirements, or temporary context

**Key insight**: You can mix context types. Example: Repository + 5 explicit files + 2 issues + custom notes.

### Step-by-Step: Creating a Space

**Step 1: Navigate to Spaces**
- Open GitHub Copilot in your IDE or visit github.com/copilot
- Click "Spaces" → "New Space"

**Step 2: Name Your Space**
- Use descriptive names: "Auth Module Debug", "Payment Feature Dev", "API Security Audit"
- Names help when you manage multiple Spaces

**Step 3: Add Context**

**Adding a repository**:
1. Click "Add repository"
2. Search or paste repository URL
3. Copilot indexes the full repository (may take 30 seconds)

**Adding specific files**:
1. Click "Add files"
2. Browse repository or paste file paths
3. Select 5-10 files for focused tasks

**Adding issues/PRs**:
1. Copy the issue or PR URL (e.g., `https://github.com/user/repo/issues/42`)
2. Paste into "Add issue" field
3. Copilot auto-syncs content (you don't need to manually update)

**Adding notes**:
1. Click "Add note"
2. Write plain text (requirements, context, temporary observations)

**Step 4: Write Custom Instructions** (covered in next section)

**Step 5: Save and Test**
- Save the Space
- Ask a question related to your context
- Verify Copilot references the correct files

---

## Writing Effective Custom Instructions

Custom instructions are rules of engagement—they tell Copilot how to behave, what to focus on, and what to avoid.

### Anatomy of Good Instructions

**Template structure**:
```
1. Role definition (who Copilot is)
2. Areas of expertise (what domains)
3. Task types (what kinds of work)
4. Explicit requirements (must-dos)
5. Prohibited behaviors (must-not-dos)
```

### Example: Strong vs. Weak Instructions

**❌ Weak instruction** (too generic):
```
Help with coding. Write good code that follows best practices.
```

**Why it fails**: No specificity. What "best practices"? For what language? What standards?

---

**✅ Strong instruction** (specific and enforceable):
```
You are an experienced Python backend engineer specializing in API development.

Focus areas:
- RESTful API design
- Database query optimization (PostgreSQL)
- Authentication and authorization

Requirements:
- Always cite exact file names and line numbers when referencing code
- Before writing code, produce a 3-5 step implementation plan
- Use type hints for all function signatures
- All database queries must use parameterized statements (never string concatenation)

When suggesting code:
- Match existing code style (PEP 8)
- Include docstrings for functions
- Provide unit test examples using pytest
```

**Why it works**:
- Defines role and expertise clearly
- Specifies concrete requirements (type hints, parameterized queries)
- Includes behavioral rules (cite sources, plan before coding)
- References team standards (PEP 8, pytest)

---

### Three Key Instruction Types

#### 1. Role and Expertise Instructions

Define who Copilot is and what domains to focus on.

**Example**:
```
You are a SQL query generator for a Django e-commerce application. 
You specialize in writing efficient PostgreSQL queries for product 
search, inventory management, and order processing.
```

**Why it matters**: Sets context for the entire interaction. Without role definition, Copilot defaults to generic assistant mode.

---

#### 2. Behavioral Requirement Instructions

Specify how Copilot should work—the process, not just the output.

**Examples**:
- "Always cite exact files when referencing code patterns"
- "Before coding, produce a step-by-step plan and ask for approval"
- "When suggesting changes, explain security implications"
- "Include performance considerations for database operations"

**Why it matters**: Prevents hallucinations and ensures traceability. Requiring citations forces Copilot to ground responses in actual project files.

---

#### 3. Standard Enforcement Instructions

Encode team standards, architectural decisions, and coding conventions.

**Examples**:
- "All API responses must follow this format: `{status: number, data: object, error?: string}`"
- "Never use `any` type in TypeScript—always provide specific types"
- "Error handling must use the custom `AppError` class defined in `utils/errors.ts`"
- "Component names must match directory structure (e.g., `components/Button/Button.tsx`)"

**Why it matters**: Keeps AI-generated code consistent with project standards, reducing code review churn.

---

## Common Instruction Mistakes

### Mistake #1: Instructions Are Too Long

**Problem**: 500-word instruction set that's hard to maintain.

**Solution**: Focus on the 5-10 most critical rules. Brevity with clarity beats exhaustive documentation.

**Example of right-sized instructions** (150 words):
```
You are a React frontend engineer for a SaaS dashboard application.

Focus: Component development, state management (Zustand), API integration.

Requirements:
- Use TypeScript with strict mode
- Functional components with hooks (no class components)
- Props must have explicit type definitions
- Always include unit tests (React Testing Library)

Code style:
- Named exports (not default exports)
- CSS Modules for styling (never inline styles)
- Error boundaries for component error handling

Before coding:
- Outline component structure
- Identify state management needs
- Plan error handling approach
```

---

### Mistake #2: Instructions Are Too Vague

**Problem**: "Follow best practices" or "Write clean code"

**Solution**: Be specific. What are *your* best practices? What does "clean" mean for *your* team?

**Vague**: "Use proper error handling"  
**Specific**: "Use try-catch blocks. Log errors with `logger.error()`. Return user-friendly messages via `ErrorResponse` class."

---

### Mistake #3: No Enforcement Mechanism

**Problem**: Instructions don't include "how to enforce"

**Solution**: Require evidence of compliance.

**Example**:
```
Requirement: All functions must be tested.
Enforcement: When suggesting new functions, always include example test cases.
```

This forces Copilot to demonstrate compliance, not just state intent.

---

## Practical Instruction Templates

### Template 1: Database Query Generator

```
You are a database query expert for a Node.js application using PostgreSQL.

Requirements:
- All queries must use parameterized statements ($1, $2, etc.)
- Never concatenate user input into SQL strings
- Include EXPLAIN ANALYZE for complex queries
- Add comments explaining query logic

When suggesting queries:
- Show both the query and the parameters array
- Explain index usage and potential bottlenecks
- Suggest indexes if query would benefit

Example format:
const query = 'SELECT * FROM users WHERE email = $1';
const params = [userEmail];
```

---

### Template 2: API Endpoint Developer

```
You are a backend engineer building REST APIs with Express.js.

All API responses must follow this structure:
{
  status: number,
  data: object | null,
  error?: { code: string, message: string, details?: object }
}

Requirements:
- Validate inputs using Joi schemas
- Use HTTP status codes correctly (200, 201, 400, 401, 404, 500)
- Log all errors with request context
- Include rate limiting for public endpoints

Before implementing:
- Identify authentication requirements
- Define validation schema
- Plan error scenarios
```

---

### Template 3: Security-Focused Code Reviewer

```
You are a security-focused code reviewer.

When reviewing code:
- Check for SQL injection vulnerabilities
- Verify input validation and sanitization
- Identify hardcoded secrets or credentials
- Flag unsafe deserialization
- Verify authentication and authorization checks

Always cite:
- Exact file name and line number
- OWASP category (if applicable)
- Severity level (critical/high/medium/low)

Provide:
- Clear explanation of the risk
- Specific remediation code
```

---

## 🛠️ Exercise 2.1: Create a Bug Fix Space

**What you'll build**: A complete Space for diagnosing and fixing a security vulnerability.

**Time**: 35 minutes

### Instructions

**Step 1: Select a Repository**
- Use your own project OR a provided sample repo
- Must have authentication or user input handling

**Step 2: Identify Relevant Files** (15 minutes)
- Find 3-5 files related to authentication or input handling
- Add them explicitly to the Space
- Document why you chose each file

**Step 3: Create a Mock Security Issue** (10 minutes)
- Write a GitHub issue describing a vulnerability (real or hypothetical)
- Example: "Possible SQL injection in login endpoint—user input not sanitized"
- Include: steps to reproduce, expected vs. actual behavior
- Add the issue URL to your Space

**Step 4: Add Security Documentation** (5 minutes)
- Add OWASP guidelines (can link to external docs)
- Include your team's security policy OR create a sample one
- Example policy: "All user input must be validated before database queries"

**Step 5: Write Custom Instructions** (5 minutes)
- Define role: Security-focused debugging assistant
- Require: Source citations, security impact explanations
- Enforce: Plan before coding

### Expected Outcome

A Space containing:
- ✅ 3-5 code files relevant to the vulnerability
- ✅ GitHub issue describing the security problem
- ✅ Security documentation (OWASP or team policy)
- ✅ Custom instructions (<200 words) that:
  - Define security-focused role
  - Require citations and explanations
  - Enforce planning before fixes

### Success Criteria

Test your Space by asking: "What's the security issue in this code?"

**Good response indicators**:
- Copilot cites specific files and line numbers
- References the GitHub issue context
- Explains security implications (OWASP category)
- Suggests fixes grounded in your security docs

---

## 🛠️ Exercise 2.2: Write Enforceable Instructions

**What you'll practice**: Crafting specific, actionable instructions for three scenarios.

**Time**: 20 minutes

### Scenarios

Write 3-5 sentences of custom instructions for each scenario:

**Scenario 1: Database Query Enforcement**
- **Requirement**: All database queries must use parameterized statements (no string concatenation)
- **Your task**: Write instructions that enforce this and explain why

**Example answer**:
```
You are a database query generator for Python/psycopg2. All SQL queries MUST use 
parameterized statements (%s or named parameters). NEVER concatenate user input 
into SQL strings. This prevents SQL injection vulnerabilities. When suggesting 
queries, always show the parameterized version with example values.
```

---

**Scenario 2: API Error Format**
- **Requirement**: All API errors must return `{status: number, error: {code: string, message: string}}`
- **Your task**: Write instructions that enforce this structure

---

**Scenario 3: Test Coverage**
- **Requirement**: All new functions must include unit test examples
- **Your task**: Write instructions that mandate test inclusion

### Evaluation

Compare your instructions to the strong example in Scenario 1:
- ✅ Specific (mentions technology: Python/psycopg2)
- ✅ Actionable (clear what to do: use %s parameters)
- ✅ Explains why (SQL injection prevention)
- ✅ Enforceable (mandates showing parameterized version)

**Weak instruction example** (avoid this):
```
Write secure database code.
```
Why weak: No specificity, no enforcement mechanism, no clear standard.

---

## Module Summary

You've completed Module 2! Here's what you learned:

✅ **Space creation mechanics**: Adding repositories, files, issues, PRs, and notes  
✅ **Context type mixing**: Combining repos with specific files for optimal coverage  
✅ **Instruction components**: Role definition, behavioral requirements, standard enforcement  
✅ **Avoiding common mistakes**: Too long, too vague, no enforcement mechanism  

### Key Takeaways

1. **Spaces support multiple context types**: Mix repos, files, issues, PRs, and notes for comprehensive coverage
2. **Instructions need specificity**: "Follow best practices" fails; "Use parameterized queries" succeeds
3. **Enforce with evidence**: Require Copilot to show compliance (e.g., "include test examples")
4. **Keep instructions concise**: 150-200 words beats 500 words

### What's Next

In **Module 3: Applied Development Workflows**, you'll use Spaces for real development scenarios: debugging, feature development, and terminal-based workflows. You'll learn the 7-step debugging workflow and how to integrate Spaces with CLI tools.

### Before You Continue

- ✅ Complete the Bug Fix Space exercise
- ✅ Write enforceable instructions for all three scenarios
- ✅ Test your Space by asking questions and evaluating response quality

---

## Discussion Question

**Question**: You're setting up a Space for a new team member's onboarding. Would you include "obvious" files like README.md and CONTRIBUTING.md, or assume Copilot can find them in the repository? What's the tradeoff?

**Consider**:
- Explicit inclusion signals importance to AI
- Repository search vs. explicit context priority
- Onboarding-specific needs vs. ongoing work needs
- Cost of over-specifying vs. potential gaps in understanding

---

## Checklist: Well-Configured Space

Use this checklist to evaluate your Spaces:

**Context Quality**:
- [ ] Context is relevant to the specific task (not generic "might need this")
- [ ] Mix of context types (code + docs + issues/PRs)
- [ ] Repository + explicit files (if using combined strategy)
- [ ] No obviously outdated content

**Instructions Quality**:
- [ ] Role and expertise defined
- [ ] Specific requirements stated (not "follow best practices")
- [ ] Behavioral rules included (citations, planning, etc.)
- [ ] Concise (< 200 words)
- [ ] Enforceable (requires demonstrable compliance)

**Validation**:
- [ ] Tested with representative questions
- [ ] Copilot cites correct files
- [ ] Responses match team standards
- [ ] No generic suggestions that ignore context
