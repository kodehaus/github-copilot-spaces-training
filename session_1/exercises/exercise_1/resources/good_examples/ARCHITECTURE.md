# Architecture Documentation

## System Architecture

### Overview

The Task Manager application follows a **three-tier architecture** with clear separation of concerns:

1. **Presentation Layer** (React Frontend)
2. **Application Layer** (Express API)
3. **Data Layer** (PostgreSQL + Redis)

### Architecture Principles

- **Separation of Concerns:** Each layer has distinct responsibilities
- **Dependency Injection:** Services and repositories are injected, not instantiated
- **Interface-Based Design:** Depend on abstractions, not implementations
- **Single Responsibility:** Each module has one reason to change
- **DRY (Don't Repeat Yourself):** Shared logic is extracted and reused

## Backend Architecture

### Layered Structure

```
┌─────────────────────────────────────────┐
│           API Routes                     │  ← HTTP endpoints, validation
├─────────────────────────────────────────┤
│          Controllers                     │  ← Request/response handling
├─────────────────────────────────────────┤
│           Services                       │  ← Business logic
├─────────────────────────────────────────┤
│         Repositories                     │  ← Data access
├─────────────────────────────────────────┤
│      Database (Prisma ORM)              │  ← Data persistence
└─────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Routes Layer
**Purpose:** Define HTTP endpoints and apply middleware

**Responsibilities:**
- Route definition (`GET /api/tasks`, `POST /api/tasks`, etc.)
- Request validation (using Zod schemas)
- Authentication middleware application
- Rate limiting

**Example:**
```typescript
// routes/task.routes.ts
router.post('/tasks', 
  authenticate,           // Auth middleware
  validate(createTaskSchema),  // Validation
  taskController.create   // Controller method
);
```

#### 2. Controller Layer
**Purpose:** Handle HTTP request/response

**Responsibilities:**
- Extract data from request (body, params, query)
- Call appropriate service method
- Format response
- Handle HTTP status codes
- No business logic here!

**Example:**
```typescript
// controllers/task.controller.ts
async create(req: Request, res: Response) {
  const taskData = req.body;
  const userId = req.user.id;
  
  const task = await taskService.createTask(taskData, userId);
  
  res.status(201).json({ data: task });
}
```

#### 3. Service Layer
**Purpose:** Implement business logic

**Responsibilities:**
- Business rules and validation
- Orchestrate multiple repositories
- Transaction management
- Domain logic
- Error handling with domain exceptions

**Example:**
```typescript
// services/task.service.ts
async createTask(taskData: CreateTaskDto, userId: string) {
  // Business rule: Check project exists and user has access
  const project = await projectRepo.findById(taskData.projectId);
  if (!project) throw new NotFoundError('Project not found');
  
  const hasAccess = await projectService.checkUserAccess(userId, project.id);
  if (!hasAccess) throw new ForbiddenError('No access to project');
  
  // Business rule: Auto-assign default status
  const status = taskData.status || 'todo';
  
  // Create task
  const task = await taskRepo.create({
    ...taskData,
    status,
    createdBy: userId
  });
  
  // Business rule: Send notification to assigned user
  if (task.assignedTo) {
    await notificationService.notifyTaskAssigned(task);
  }
  
  return task;
}
```

#### 4. Repository Layer
**Purpose:** Abstract data access

**Responsibilities:**
- CRUD operations
- Database queries
- Data mapping (DB models ↔ Domain entities)
- No business logic!

**Example:**
```typescript
// repositories/task.repository.ts
async create(taskData: CreateTaskData): Promise<Task> {
  return await prisma.task.create({
    data: taskData,
    include: {
      assignedUser: true,
      project: true,
      comments: true
    }
  });
}
```

## Frontend Architecture

### Component Structure

```
src/
├── features/               # Feature-based organization
│   ├── tasks/
│   │   ├── components/    # Feature-specific components
│   │   ├── hooks/         # Feature-specific hooks
│   │   ├── services/      # API calls
│   │   ├── store/         # Redux slice
│   │   └── types/         # TypeScript types
│   └── projects/
│       └── ...
├── components/            # Shared components
│   ├── Button/
│   ├── Modal/
│   └── Layout/
├── hooks/                 # Shared hooks
├── services/              # Shared API services
└── store/                 # Redux store configuration
```

### State Management Strategy

**Redux Toolkit for:**
- Global application state (user, auth)
- Shared data accessed by multiple features
- Data that needs to persist across navigation

**React State for:**
- Component-local UI state (open/closed, form values)
- Temporary data not needed elsewhere
- Simple toggle states

**React Query for:**
- Server state caching
- API data fetching and synchronization
- Optimistic updates

### Component Patterns

#### 1. Container/Presenter Pattern

**Container Components:**
- Connect to Redux
- Handle data fetching
- Manage complex state
- Pass data to presenters

**Presenter Components:**
- Receive data via props
- Render UI only
- Call callback functions
- No direct API calls or Redux

**Example:**
```typescript
// TaskListContainer.tsx (Container)
export const TaskListContainer: React.FC = () => {
  const { data: tasks, isLoading } = useTasksQuery();
  const dispatch = useDispatch();
  
  const handleTaskComplete = (taskId: string) => {
    dispatch(completeTask(taskId));
  };
  
  return (
    <TaskList 
      tasks={tasks}
      isLoading={isLoading}
      onTaskComplete={handleTaskComplete}
    />
  );
};

// TaskList.tsx (Presenter)
interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskComplete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onTaskComplete
}) => {
  if (isLoading) return <Spinner />;
  
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onComplete={onTaskComplete}
        />
      ))}
    </ul>
  );
};
```

#### 2. Custom Hooks Pattern

Extract reusable logic into custom hooks:

```typescript
// hooks/useTaskForm.ts
export const useTaskForm = (initialTask?: Task) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const reset = () => {
    setTitle('');
    setDescription('');
    setErrors({});
  };
  
  return {
    title, setTitle,
    description, setDescription,
    errors,
    validate,
    reset
  };
};
```

## Data Flow

### API Request Flow

```
User Action
    ↓
Component dispatches action
    ↓
Redux Thunk / React Query
    ↓
API Service (Axios)
    ↓
Backend Route
    ↓
Controller
    ↓
Service (Business Logic)
    ↓
Repository (Database)
    ↓
Response back up the chain
    ↓
Redux State / React Query Cache updated
    ↓
Component re-renders with new data
```

### Real-Time Updates Flow

```
Backend Event (task created/updated)
    ↓
WebSocket Server broadcasts
    ↓
Frontend WebSocket Client receives
    ↓
Redux action dispatched
    ↓
State updated
    ↓
Connected components re-render
```

## Security Architecture

### Authentication Flow

1. User submits credentials
2. Backend validates against database
3. Backend generates JWT access token (15min) + refresh token (7 days)
4. Tokens stored in httpOnly cookies
5. Access token included in API requests via cookie
6. Backend middleware validates token on protected routes

### Authorization Model

**Role-Based Access Control (RBAC):**
- Owner: Full control, can delete project
- Admin: Manage team, settings, tasks
- Member: Create and manage own tasks, comment
- Viewer: Read-only access

**Permissions checked at:**
- API route level (middleware)
- Service layer (business logic)
- Frontend UI (hide/disable actions)

## Performance Considerations

### Backend Optimization
- Database query optimization (proper indexes)
- N+1 query prevention (Prisma includes)
- Redis caching for frequently accessed data
- Rate limiting to prevent abuse
- Pagination for large datasets

### Frontend Optimization
- Code splitting (React.lazy)
- Memoization (React.memo, useMemo)
- Virtual scrolling for long lists
- Debouncing for search inputs
- Optimistic updates for better UX

## Scalability Strategy

### Current Setup (Single Region)
- Single PostgreSQL primary database
- Redis for caching and sessions
- ECS containers with auto-scaling (2-10 instances)
- CloudFront CDN for static assets

### Future Scaling Options
- Read replicas for PostgreSQL
- Database sharding by team/project
- Multi-region deployment
- Separate microservices for heavy operations (reporting, notifications)

## Error Handling

### Error Types
- **ValidationError:** Bad input from user (400)
- **NotFoundError:** Resource doesn't exist (404)
- **UnauthorizedError:** Not authenticated (401)
- **ForbiddenError:** Not authorized (403)
- **ConflictError:** Resource conflict (409)
- **InternalError:** Server error (500)

### Error Response Format
```json
{
  "error": {
    "type": "ValidationError",
    "message": "Invalid task data",
    "details": {
      "title": "Title is required",
      "dueDate": "Due date must be in the future"
    },
    "requestId": "abc-123-def"
  }
}
```

## Deployment Pipeline

```
Developer Push to GitHub
    ↓
GitHub Actions triggered
    ↓
Run Tests (unit, integration, e2e)
    ↓
Run Linting & Type Checking
    ↓
Build Docker Images
    ↓
Push to ECR (Container Registry)
    ↓
Deploy to Staging Environment
    ↓
Run Smoke Tests
    ↓
Manual approval for Production
    ↓
Deploy to Production (Blue/Green)
    ↓
Monitor for errors
```

## Monitoring & Observability

### Metrics Tracked
- API response times
- Error rates by endpoint
- Database query performance
- Cache hit rates
- User activity patterns

### Logging Strategy
- **Structured Logging:** JSON format
- **Log Levels:** Error, Warn, Info, Debug
- **Correlation IDs:** Track requests across services
- **PII Handling:** Never log passwords, tokens, or sensitive data

### Alerting Rules
- Error rate > 1% for 5 minutes
- API response time > 2 seconds for 10 minutes
- Database connection pool exhausted
- High memory usage (> 90%)

---

**Last Updated:** January 12, 2026
