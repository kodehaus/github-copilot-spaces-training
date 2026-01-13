# Scenario 3: Code Review Workflow

**Duration:** 12 minutes  
**Workflow Type:** Code Quality Review

---

## The Situation

Your team lead asks you to review a pull request from a new junior developer:

> **PR #1298: Add task assignment feature**
> 
> "Added ability to assign tasks to team members. Please review before I merge to main. Thanks! 🚀"

When you ask Copilot to help review the code, you get generic responses like:

> "The code looks functional. Consider adding error handling and improving variable names."

**This doesn't help you check for:**
- Project-specific style guide violations
- Architectural pattern consistency
- Security best practices for your application
- Performance considerations
- Testing completeness

---

## The Code to Review

**File: `task.controller.ts` (new code)**

```typescript
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
  private taskService = new TaskService();

  async assignTask(req: Request, res: Response) {
    const taskId = req.body.taskId;
    const userId = req.body.userId;
    
    const task = await this.taskService.getTaskById(taskId);
    
    if (task) {
      task.assignedTo = userId;
      await this.taskService.updateTask(task);
      res.json({ success: true, task: task });
    } else {
      res.json({ success: false, message: 'Task not found' });
    }
  }
}
```

**File: `task.service.ts` (modified)**

```typescript
export class TaskService {
  async getTaskById(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    return task;
  }
  
  async updateTask(task: any) {
    await prisma.task.update({
      where: { id: task.id },
      data: task
    });
  }
}
```

---

## Your Team's Standards

**Your project has specific conventions that should be followed:**

### 1. **Coding Standards** (from CODING_STANDARDS.md)

**Controller Pattern:**
- Controllers must be thin - only handle HTTP concerns
- Inject services via constructor (dependency injection)
- Use DTOs for request/response types
- Always validate input data
- Return proper HTTP status codes (200, 400, 404, 500)
- Handle errors with try-catch and proper error responses

**Service Pattern:**
- Services contain business logic
- Never use `any` type - always explicit types
- Validate business rules before data changes
- Return typed results, not raw database objects
- Use transactions for multi-step operations

**TypeScript Standards:**
- No `any` types allowed
- Use interfaces for object shapes
- Async functions must have proper error handling
- Use destructuring for cleaner code

### 2. **Security Requirements**

- Always verify user permissions before actions
- Validate and sanitize all user input
- Check if user has permission to assign tasks to others
- Audit log all assignment changes
- Rate limit user actions

### 3. **Testing Requirements**

Every new feature must include:
- Unit tests for service methods
- Integration tests for controllers
- Test both success and error cases
- Test edge cases (null, undefined, invalid IDs)

### 4. **Common Issues from Past PRs**

Your team frequently comments on:
- Missing error handling
- No permission checks
- Using `any` type
- Not following DTO pattern
- Missing tests
- No audit logging
- Inconsistent naming conventions

---

## Your Task

**Analyze:** What context does the AI need to perform effective code reviews?

Consider:
- What style guide rules apply?
- What architectural patterns should be followed?
- What security checks are required?
- What testing standards exist?
- What common issues should be flagged?

**Engineer:** Add appropriate context to your Copilot Space

Think about:
- Coding standards documentation
- Examples of properly written controllers/services
- Security requirements checklist
- Testing patterns and examples
- Common code review feedback patterns
- Linting rules or configuration

**Test:** Ask the AI to review the code

Try questions like:
- "Review this task assignment code for quality issues"
- "Does this code follow our project's patterns?"
- "What security issues might this code have?"
- "Is this code ready to merge?"

**Evaluate:** Does the AI catch project-specific issues?

---

## What the AI Should Catch

With proper context, the AI should identify issues like:

**Architecture Issues:**
- ❌ Service instantiation in controller (should use dependency injection)
- ❌ Missing DTO types for request/response
- ❌ No input validation
- ❌ Wrong HTTP status codes (should use 404, not 200 with success:false)

**TypeScript Issues:**
- ❌ Using `any` type in updateTask method
- ❌ Missing explicit return types
- ❌ No interface for task object

**Security Issues:**
- ❌ No permission check (can user assign tasks?)
- ❌ No validation of taskId and userId
- ❌ No audit logging of assignment change
- ❌ Missing authentication check

**Business Logic Issues:**
- ❌ Direct assignment without checking user exists
- ❌ No check if user can be assigned tasks (active? correct role?)
- ❌ No notification sent to assigned user

**Error Handling Issues:**
- ❌ No try-catch blocks
- ❌ No handling of database errors
- ❌ Silent failures possible

**Testing Issues:**
- ❌ No tests provided with PR
- ❌ No test coverage for error cases

---

## Success Indicators

✅ **Good AI response includes:**
- Specific references to your coding standards
- Points out violations of your patterns (DI, DTOs, types)
- Identifies missing security checks per your requirements
- Notes missing tests based on your testing policy
- Suggests fixes that match your existing code examples
- References specific sections of your style guide

❌ **Generic AI response includes:**
- General advice applicable to any project
- No reference to your specific patterns
- Misses project-specific security requirements
- Generic "consider adding tests" (not specific to your standards)
- No awareness of your team's common issues

---

## Reflection Questions

After completing this scenario:

1. What context was most important for code review help?
2. How did style guide context change the AI's review quality?
3. What surprised you about what the AI caught (or missed)?
4. How would you approach code review scenarios in the future?
