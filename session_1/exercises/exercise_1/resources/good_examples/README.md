# TaskFlow - Project Management Application

**Last Updated:** January 10, 2026  
**Version:** 2.4.0  
**Status:** Active Development

## Project Overview

TaskFlow is a modern project management application designed for agile teams. It provides real-time task tracking, collaborative workflows, and intelligent automation to streamline team productivity.

## Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **TypeScript** 5.3.0 - Type safety
- **Redux Toolkit** 2.0.0 - State management
- **React Query** 5.0.0 - Server state & caching
- **TailwindCSS** 3.4.0 - Styling
- **Vite** 5.0.0 - Build tool

### Backend
- **Node.js** 20.10.0 LTS
- **Express** 4.18.0 - Web framework
- **TypeScript** 5.3.0
- **Prisma** 5.7.0 - ORM
- **PostgreSQL** 16.1 - Database
- **Redis** 7.2 - Caching & sessions

### Testing
- **Vitest** 1.0.0 - Unit tests
- **Playwright** 1.40.0 - E2E tests
- **React Testing Library** 14.1.0

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   API       │─────▶│  Database   │
│   (React)   │      │  (Express)  │      │ (PostgreSQL)│
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                     
       │                    ▼                     
       │             ┌─────────────┐             
       │             │   Redis     │             
       └────────────▶│  (Cache)    │             
                     └─────────────┘             
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed system design.

## Project Structure

```
taskflow/
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── features/      # Feature modules
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API clients
│   │   ├── store/         # Redux store
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   └── tests/             # Frontend tests
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── repositories/  # Data access
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   └── utils/         # Helper functions
│   ├── prisma/            # Database schema
│   └── tests/             # Backend tests
└── docs/                  # Documentation
```

## Core Features

- ✅ Task creation, assignment, and tracking
- ✅ Real-time updates via WebSocket
- ✅ Sprint planning and Kanban boards
- ✅ Team collaboration and comments
- ✅ File attachments (AWS S3)
- ✅ Role-based access control (RBAC)
- ✅ Activity timeline and audit logs
- ✅ Email notifications
- 🚧 AI-powered task suggestions (In Progress)
- 📋 Advanced reporting dashboard (Planned)

## Getting Started

### Prerequisites

- Node.js 20.10.0 or higher
- PostgreSQL 16.x
- Redis 7.x
- npm 10.x or yarn 1.22.x

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/acme-corp/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

   Required environment variables:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key-here
   AWS_ACCESS_KEY_ID=your-aws-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret
   AWS_S3_BUCKET=taskflow-attachments
   ```

4. **Set up database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   # Backend runs on http://localhost:3000

   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - API Docs: http://localhost:3000/api-docs

### Test Credentials

For development environment:
- Admin: `admin@taskflow.local` / `admin123`
- User: `user@taskflow.local` / `user123`

## Development Workflow

### Running Tests

```bash
# Backend unit tests
cd backend
npm test

# Backend with coverage
npm run test:coverage

# Frontend unit tests
cd frontend
npm test

# E2E tests (requires both servers running)
cd frontend
npm run test:e2e
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Database Operations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## Common Tasks

### Adding a New API Endpoint

1. Create controller in `backend/src/controllers/`
2. Add service logic in `backend/src/services/`
3. Define routes in `backend/src/routes/`
4. Add tests in `backend/tests/`
5. Update API documentation

See [CODING_STANDARDS.md](CODING_STANDARDS.md) for patterns.

### Creating a New React Component

1. Create component in `frontend/src/components/`
2. Follow component structure in [example_component.tsx](example_component.tsx)
3. Add tests in same directory
4. Export from `index.ts`

### Working with Copilot

See [copilot-instructions.md](copilot-instructions.md) for AI assistance guidelines.

## API Documentation

Interactive API documentation available at:
- Development: http://localhost:3000/api-docs
- Staging: https://staging-api.taskflow.io/api-docs
- Production: https://api.taskflow.io/api-docs

## Deployment

### Environments

- **Development**: Local machines
- **Staging**: https://staging.taskflow.io
- **Production**: https://app.taskflow.io

### Deploy to Staging

```bash
npm run deploy:staging
```

### Deploy to Production

```bash
npm run deploy:production
```

Deployments use GitHub Actions CI/CD pipeline. See `.github/workflows/deploy.yml`.

## Monitoring & Logs

- **Application Monitoring**: Datadog
- **Error Tracking**: Sentry
- **Logs**: CloudWatch
- **Performance**: Lighthouse CI

Dashboards:
- [Datadog Dashboard](https://app.datadoghq.com/dashboard/taskflow)
- [Sentry Issues](https://sentry.io/organizations/acme/issues/)

## Resources

- **Project Board**: [Jira Board](https://acme.atlassian.net/jira/software/projects/TF)
- **Designs**: [Figma Files](https://figma.com/file/taskflow-designs)
- **Wiki**: [Confluence Space](https://acme.atlassian.net/wiki/spaces/TF)
- **Slack Channel**: #taskflow-dev

## Contributing

1. Create feature branch from `main`
2. Follow [CODING_STANDARDS.md](CODING_STANDARDS.md)
3. Write tests for new features
4. Submit PR with description
5. Get 2 approvals before merging

## Support & Contact

- **Tech Lead**: Sarah Chen (sarah.chen@acme.com)
- **Product Owner**: Mike Rodriguez (mike.rodriguez@acme.com)
- **Team Email**: taskflow-team@acme.com
- **Slack**: #taskflow-support

## License

Proprietary - © 2026 Acme Corporation. All rights reserved.

---

**Need Help?** Check the [wiki](https://acme.atlassian.net/wiki/spaces/TF) or ask in #taskflow-support Slack channel.
