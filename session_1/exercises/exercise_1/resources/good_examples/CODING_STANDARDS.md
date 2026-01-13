# Coding Standards and Best Practices

## General Principles

1. **Write code for humans first, computers second**
2. **Be consistent with existing patterns**
3. **Prioritize readability over cleverness**
4. **Test your code thoroughly**
5. **Document non-obvious decisions**

## TypeScript Guidelines

### Naming Conventions

```typescript
// ✅ GOOD - Clear, descriptive names
const MAX_RETRY_ATTEMPTS = 3;                    // Constants: UPPER_SNAKE_CASE
interface UserProfile { ... }                     // Interfaces: PascalCase
type TaskStatus = 'todo' | 'in_progress' | 'done';  // Types: PascalCase
class TaskService { ... }                         // Classes: PascalCase
function calculateDueDate() { ... }               // Functions: camelCase
const userId = '123';                             // Variables: camelCase
enum Priority { Low, Medium, High }               // Enums: PascalCase

// ❌ BAD - Unclear, inconsistent
const x = 3;                                      // Too short
const User_Profile_Data = { };                    // Inconsistent casing
function do_thing() { }                           // Wrong convention
```

### Type Definitions

```typescript
// ✅ GOOD - Explicit types
interface CreateTaskDto {
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

function createTask(data: CreateTaskDto): Promise<Task> {
  // Implementation
}

// ❌ BAD - Using 'any' or omitting types
function createTask(data: any) {  // Don't use 'any'
  // Implementation
}
```

### Async/Await

```typescript
// ✅ GOOD - Use async/await
async function fetchUserTasks(userId: string): Promise<Task[]> {
  try {
    const tasks = await taskRepository.findByUserId(userId);
    return tasks;
  } catch (error) {
    logger.error('Failed to fetch tasks', { userId, error });
    throw new DatabaseError('Could not retrieve tasks');
  }
}

// ❌ BAD - Promise chains are harder to read
function fetchUserTasks(userId: string): Promise<Task[]> {
  return taskRepository.findByUserId(userId)
    .then(tasks => tasks)
    .catch(error => {
      logger.error('Failed to fetch tasks', { userId, error });
      throw new DatabaseError('Could not retrieve tasks');
    });
}
```

### Error Handling

```typescript
// ✅ GOOD - Specific error types
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Use it
if (!data.title?.trim()) {
  throw new ValidationError(
    'Title is required',
    'title',
    data.title
  );
}

// ❌ BAD - Generic errors
if (!data.title) {
  throw new Error('bad data');  // Too vague, no context
}
```

## React/Frontend Guidelines

### Component Structure

```typescript
// ✅ GOOD - Well-structured component
import React from 'react';
import { Task } from '@/types';
import { Button } from '@/components/Button';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

/**
 * Displays a single task card with actions
 * @param task - The task to display
 * @param onComplete - Callback when task is marked complete
 * @param onDelete - Callback when task is deleted
 */
export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onDelete
}) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={styles.card}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className={styles.actions}>
        <Button onClick={handleComplete}>Complete</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

// ❌ BAD - Poor structure
export default function TaskCard(props: any) {  // No interface, using any
  return (
    <div>
      <h3>{props.task.title}</h3>
      {/* Inline handlers make testing harder */}
      <button onClick={() => props.onComplete(props.task.id)}>Done</button>
      {/* No confirmation, direct deletion */}
      <button onClick={() => props.onDelete(props.task.id)}>Delete</button>
    </div>
  );
}
```

### Hooks Usage

```typescript
// ✅ GOOD - Custom hooks for reusable logic
function useTaskFilter(tasks: Task[], filters: FilterOptions) {
  return useMemo(() => {
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.assignedTo && task.assignedTo !== filters.assignedTo) return false;
      return true;
    });
  }, [tasks, filters]);
}

// Use in component
function TaskList() {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState<FilterOptions>({});
  const filteredTasks = useTaskFilter(tasks, filters);
  
  return (
    <div>
      {filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}

// ❌ BAD - Logic directly in component
function TaskList() {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState({});
  
  // Recalculates on every render
  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.assignedTo && task.assignedTo !== filters.assignedTo) return false;
    return true;
  });
  
  return <div>...</div>;
}
```

### State Updates

```typescript
// ✅ GOOD - Immutable updates
const [user, setUser] = useState<User>(initialUser);

// Update nested property
setUser(prev => ({
  ...prev,
  profile: {
    ...prev.profile,
    name: 'New Name'
  }
}));

// ❌ BAD - Direct mutation
user.profile.name = 'New Name';  // Don't mutate state!
setUser(user);  // React won't detect change
```

## Backend Guidelines

### Controller Pattern

```typescript
// ✅ GOOD - Thin controllers
class TaskController {
  constructor(private taskService: TaskService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const taskData = req.body;
      const userId = req.user!.id;
      
      const task = await this.taskService.createTask(taskData, userId);
      
      res.status(201).json({ 
        success: true, 
        data: task 
      });
    } catch (error) {
      next(error);  // Pass to error handler middleware
    }
  }
}

// ❌ BAD - Business logic in controller
class TaskController {
  async create(req: Request, res: Response) {
    // Don't put business logic here!
    const project = await db.project.findOne(req.body.projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const task = await db.task.create({
      ...req.body,
      status: req.body.status || 'todo'  // Business rule in controller
    });
    
    // Don't send notifications from controller
    await sendEmail(task.assignedTo, 'New task assigned');
    
    res.json(task);
  }
}
```

### Service Layer

```typescript
// ✅ GOOD - Services contain business logic
class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private projectService: ProjectService,
    private notificationService: NotificationService
  ) {}

  async createTask(
    data: CreateTaskDto,
    userId: string
  ): Promise<Task> {
    // Validate business rules
    await this.projectService.verifyAccess(data.projectId, userId);
    
    // Apply business logic
    const taskData = {
      ...data,
      status: data.status || this.getDefaultStatus(data.projectId),
      createdBy: userId,
      createdAt: new Date()
    };
    
    // Execute in transaction
    const task = await this.taskRepo.create(taskData);
    
    // Side effects
    if (task.assignedTo) {
      await this.notificationService.notifyAssignment(task);
    }
    
    return task;
  }
  
  private getDefaultStatus(projectId: string): string {
    // Business logic for default status
    return 'todo';
  }
}
```

### Repository Pattern

```typescript
// ✅ GOOD - Repositories only handle data access
class TaskRepository {
  async create(data: CreateTaskData): Promise<Task> {
    return await prisma.task.create({
      data,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        project: true
      }
    });
  }
  
  async findByProjectId(
    projectId: string,
    options?: QueryOptions
  ): Promise<Task[]> {
    return await prisma.task.findMany({
      where: { projectId },
      skip: options?.offset,
      take: options?.limit,
      orderBy: { createdAt: 'desc' }
    });
  }
}

// ❌ BAD - Business logic in repository
class TaskRepository {
  async create(data: any): Promise<Task> {
    // Don't validate here
    if (!data.title) throw new Error('Title required');
    
    // Don't apply business rules here
    if (!data.status) data.status = 'todo';
    
    // Don't send notifications here
    const task = await prisma.task.create({ data });
    await sendEmail(task.assignedTo, 'Task created');
    
    return task;
  }
}
```

## Testing Standards

### Test Organization

```typescript
// ✅ GOOD - Well-organized tests
describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepo: jest.Mocked<TaskRepository>;
  let mockProjectService: jest.Mocked<ProjectService>;
  
  beforeEach(() => {
    mockTaskRepo = createMockTaskRepo();
    mockProjectService = createMockProjectService();
    taskService = new TaskService(mockTaskRepo, mockProjectService);
  });
  
  describe('createTask', () => {
    it('should create task successfully with valid data', async () => {
      // Arrange
      const taskData = { title: 'Test Task', projectId: '123' };
      const userId = 'user-1';
      mockProjectService.verifyAccess.mockResolvedValue(true);
      mockTaskRepo.create.mockResolvedValue(mockTask);
      
      // Act
      const result = await taskService.createTask(taskData, userId);
      
      // Assert
      expect(result).toEqual(mockTask);
      expect(mockTaskRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Test Task' })
      );
    });
    
    it('should throw error when user lacks project access', async () => {
      // Arrange
      const taskData = { title: 'Test', projectId: '123' };
      mockProjectService.verifyAccess.mockResolvedValue(false);
      
      // Act & Assert
      await expect(
        taskService.createTask(taskData, 'user-1')
      ).rejects.toThrow(ForbiddenError);
    });
  });
});
```

### Test Coverage Requirements

- **Unit Tests:** All service methods, utility functions
- **Integration Tests:** API endpoints, database operations
- **Component Tests:** React components with user interactions
- **Minimum Coverage:** 80% for new code

## Code Review Checklist

### Functionality
- [ ] Code works as intended
- [ ] Edge cases are handled
- [ ] Error scenarios are covered
- [ ] Tests pass and cover new code

### Code Quality
- [ ] Follows TypeScript/React best practices
- [ ] Naming is clear and consistent
- [ ] No code duplication
- [ ] Functions are focused and small (<50 lines)
- [ ] Complex logic is commented

### Performance
- [ ] No obvious performance issues
- [ ] Database queries are optimized
- [ ] Unnecessary re-renders avoided (React)
- [ ] Large lists use pagination or virtualization

### Security
- [ ] No SQL injection vulnerabilities
- [ ] User input is validated
- [ ] Sensitive data is not logged
- [ ] Authentication/authorization is enforced

### Documentation
- [ ] Public APIs are documented
- [ ] Complex algorithms explained
- [ ] README updated if needed

## Common Patterns

### API Response Format

```typescript
// ✅ Success Response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}

// ✅ Error Response
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Invalid input",
    "details": {
      "title": "Title is required"
    }
  }
}
```

### Pagination

```typescript
// ✅ Query params for pagination
GET /api/tasks?page=2&limit=20&sortBy=createdAt&order=desc

// Response includes pagination meta
{
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

**When in doubt, ask in #task-manager-dev or check existing code for examples!**

**Last Updated:** January 12, 2026
