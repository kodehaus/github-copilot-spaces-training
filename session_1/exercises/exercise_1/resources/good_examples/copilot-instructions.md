# GitHub Copilot Instructions

These instructions guide GitHub Copilot when working in this project.

## Project Context

This is a task management web application built with:
- **Frontend:** React 18 + TypeScript + Redux Toolkit + Material-UI
- **Backend:** Node.js + Express + PostgreSQL + Prisma
- **Architecture:** Three-tier with service layer pattern

## Code Generation Guidelines

### TypeScript Standards

When generating TypeScript code:
- Always use explicit types, never `any`
- Use interfaces for object shapes, types for unions/aliases
- Prefer `async/await` over promise chains
- Use proper error handling with custom error classes

### React Component Pattern

When creating React components:
```typescript
// Always follow this structure:
import React from 'react';
import { ComponentProps } from '@/types';

interface MyComponentProps {
  // Define all props with types
  title: string;
  onAction: (id: string) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction
}) => {
  // Component logic here
  return (
    // JSX here
  );
};
```

### Backend Service Pattern

When creating backend services:
```typescript
// Always inject dependencies in constructor
class MyService {
  constructor(
    private repository: MyRepository,
    private otherService: OtherService
  ) {}
  
  async doSomething(data: InputDto): Promise<OutputDto> {
    // Business logic here
    // Call repository for data access
    // Call other services for related operations
  }
}
```

## File Organization

### Frontend Files
- Place feature components in: `frontend/src/features/{feature}/components/`
- Place shared components in: `frontend/src/components/`
- Place API services in: `frontend/src/features/{feature}/services/`
- Place types in: `frontend/src/features/{feature}/types/`

### Backend Files
- Place controllers in: `backend/src/controllers/`
- Place services in: `backend/src/services/`
- Place repositories in: `backend/src/repositories/`
- Place DTOs in: `backend/src/dtos/`

## Naming Conventions

### Functions and Variables
```typescript
// Use descriptive, verb-based names for functions
const fetchUserTasks = async (userId: string) => { ... };
const calculateDueDate = (days: number) => { ... };
const validateTaskInput = (data: unknown) => { ... };

// Use noun-based names for variables
const taskCount = 10;
const currentUser = { ... };
const isLoading = false;
```

### Components
```typescript
// Use PascalCase, descriptive noun phrases
TaskCard, TaskList, ProjectDashboard, UserProfileModal
```

### Files
- Components: `TaskCard.tsx`, `UserProfile.tsx`
- Services: `task.service.ts`, `auth.service.ts`
- Repositories: `task.repository.ts`
- Types: `task.types.ts`

## Common Patterns

### API Endpoints

When creating endpoints, follow REST conventions:
```typescript
// ✅ Good
GET    /api/tasks              // List all tasks
GET    /api/tasks/:id          // Get single task
POST   /api/tasks              // Create task
PUT    /api/tasks/:id          // Update task (full)
PATCH  /api/tasks/:id          // Update task (partial)
DELETE /api/tasks/:id          // Delete task

// Nested resources
GET    /api/projects/:projectId/tasks
POST   /api/projects/:projectId/tasks
```

### Error Handling

Always use custom error classes:
```typescript
// In services
if (!user) {
  throw new NotFoundError('User not found');
}

if (!hasPermission) {
  throw new ForbiddenError('Insufficient permissions');
}

if (!isValid) {
  throw new ValidationError('Invalid input', { field: 'title' });
}
```

### Database Queries

When using Prisma, always:
- Use type-safe queries
- Include related data when needed
- Add pagination for lists
- Use transactions for multi-step operations

```typescript
// ✅ Good - includes related data, paginated
const tasks = await prisma.task.findMany({
  where: { projectId },
  include: {
    assignedUser: {
      select: { id: true, name: true, email: true }
    },
    project: true
  },
  skip: offset,
  take: limit,
  orderBy: { createdAt: 'desc' }
});
```

## Security Considerations

### Authentication
- Always verify user is authenticated before processing requests
- Check authentication in middleware, not in controllers
- Extract user ID from verified token, never trust client input

### Authorization
- Always check if user has permission to access/modify resource
- Check permissions in service layer
- Use role-based access control (RBAC)

### Input Validation
- Always validate and sanitize user input
- Use Zod schemas for validation
- Validate in route layer before reaching controller

```typescript
// ✅ Good
const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  priority: z.enum(['low', 'medium', 'high'])
});

router.post('/tasks', 
  authenticate,
  validate(createTaskSchema),
  taskController.create
);
```

## Testing Expectations

### Unit Tests
When generating test files:
- Test all public methods
- Test success cases and error cases
- Mock dependencies
- Use descriptive test names

```typescript
describe('TaskService.createTask', () => {
  it('should create task successfully with valid data', async () => {
    // Test implementation
  });
  
  it('should throw NotFoundError when project does not exist', async () => {
    // Test implementation
  });
  
  it('should throw ForbiddenError when user lacks access', async () => {
    // Test implementation
  });
});
```

## Code Comments

### When to Comment
- Complex algorithms or business logic
- Non-obvious decisions or workarounds
- Public API methods (JSDoc format)
- Important security considerations

### When NOT to Comment
- Obvious code (let the code speak for itself)
- Restating what the code does
- Commented-out code (delete it instead)

```typescript
// ✅ Good - explains WHY
// Use exponential backoff to handle rate limiting from external API
const delay = Math.pow(2, retryCount) * 1000;

// ❌ Bad - explains WHAT (obvious from code)
// Set the delay variable
const delay = 1000;
```

## Response Format Preferences

### When suggesting code:
1. Provide complete, working code (not snippets with "...")
2. Include necessary imports
3. Follow project's existing patterns
4. Add brief explanation of key decisions
5. Point out any setup or dependencies needed

### When explaining concepts:
1. Be concise but thorough
2. Provide code examples when helpful
3. Reference project's existing code patterns
4. Highlight relevant files or documentation

## Project-Specific Rules

### Task Status Flow
Tasks must follow this status progression:
`todo` → `in_progress` → `review` → `done`

Status cannot skip steps or go backward (except to `todo` from any state).

### Priority Levels
Only three priority levels allowed: `low`, `medium`, `high`

### Date Handling
- All dates stored as UTC in database
- Convert to user's timezone in frontend
- Use `date-fns` library for date operations, not moment.js

### Authentication
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Tokens stored in httpOnly cookies, not localStorage

## Common Tasks

### Adding a New Feature
1. Create Prisma model if needed
2. Generate migration: `npx prisma migrate dev`
3. Create repository methods
4. Create service with business logic
5. Create controller
6. Add routes with validation
7. Create React components
8. Add Redux slice if global state needed
9. Write tests for all layers

### Adding a New API Endpoint
1. Define DTO types
2. Create Zod validation schema
3. Add route with validation middleware
4. Implement controller method
5. Add/update service method
6. Add/update repository method
7. Write integration tests

---

**Remember:** Consistency with existing code is more important than personal preferences. When in doubt, check similar existing code in the project!
