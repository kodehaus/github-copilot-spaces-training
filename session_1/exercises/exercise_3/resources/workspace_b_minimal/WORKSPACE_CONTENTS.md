# Workspace B: Minimal Context

This workspace represents a team that only added a couple of files to their Copilot Space.

## Current Symptoms

When team members use this workspace:
- AI asks many clarifying questions ("What framework are you using?")
- Suggestions don't match the team's coding conventions
- AI provides generic examples that don't fit the project architecture
- Every interaction requires extensive explanation

## Files Currently in Workspace

Only 2 files are included in the workspace context:

### 1. README.md
```markdown
# Project X

A web application.

## Setup

npm install
npm start

## Contact

team@example.com
```

### 2. index.ts
```typescript
import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Files NOT in Workspace (Available in Repository)

The team's repository contains many other files that could be valuable context:

### Documentation
- ARCHITECTURE.md (exists but not in workspace) - Describes three-tier architecture, service layer pattern
- CODING_STANDARDS.md (exists but not in workspace) - TypeScript conventions, naming patterns, error handling
- API_DOCUMENTATION.md (exists but not in workspace) - REST API endpoints, request/response formats
- SECURITY_GUIDELINES.md (exists but not in workspace) - Auth patterns, input validation rules

### Example Code
- src/controllers/user.controller.ts - Well-written controller example
- src/services/auth.service.ts - Authentication service with proper patterns
- src/models/user.model.ts - TypeScript interface definitions
- src/middleware/auth.middleware.ts - JWT authentication middleware

### Configuration
- tsconfig.json - TypeScript configuration with strict rules
- .eslintrc.json - Linting rules (no-any, explicit return types)
- jest.config.js - Testing setup and conventions

### Project Context
- package.json - Lists all dependencies (React 18, Express 4.18, Prisma 5.7, etc.)
- prisma/schema.prisma - Database schema showing all models and relationships

## Your Audit Task

Using the 5-Point Framework, evaluate this workspace:

1. **Workspace Files Complete?** - What's missing?
2. **Documentation Accessible?** - Can AI find project docs?
3. **Errors/Logs Visible?** - (Not applicable here)
4. **Scope Appropriate?** - Enough context?
5. **Information Current?** - Is what's there up-to-date?

**Remember:** Some symptoms mentioned in exercise_3.md may not be context-related. Focus on what affects AI assistance quality.

## Questions to Consider

- What would help AI understand the project architecture?
- What documentation would reduce clarifying questions?
- What code examples would show proper patterns?
- How could AI know about the team's coding conventions?
- What's the minimum viable context for effective assistance?
