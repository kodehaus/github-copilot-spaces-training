# Workspace C: Outdated Context

This workspace represents a team that set up their context 3 years ago and never updated it.

## Current Symptoms

When team members use this workspace:
- AI suggests deprecated APIs and libraries
- Solutions use old patterns that the team no longer follows
- Recommendations conflict with current tech stack
- AI doesn't know about recent architectural changes

## Files in Workspace (All Outdated)

### README.md (Last updated: January 2023)
```markdown
# TaskHub

Version 1.0 - Project Management Tool

## Tech Stack

- React 16.8 (with class components)
- Node.js 14
- MongoDB 4.4
- Express 4.16

## Setup

npm install
npm start

Server runs on http://localhost:8080

## Authentication

Currently using session cookies. Planning to migrate to JWT tokens soon.

## Database

MongoDB hosted on mLab (Note: mLab was acquired by MongoDB Atlas in 2018)
```

### CODING_STANDARDS.md (Last updated: March 2023)
```markdown
# Coding Standards

## React Components

Use class components with lifecycle methods:

```javascript
class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  
  componentDidMount() {
    // Load data
  }
  
  render() {
    return <div>{this.props.task.title}</div>;
  }
}
```

## State Management

Use Redux with connect() HOC:

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
```

## Async Operations

Use promise chains:

```javascript
fetchTasks()
  .then(data => setTasks(data))
  .catch(error => handleError(error));
```

## Styling

Use CSS modules with .module.css files.
```

### ARCHITECTURE.md (Last updated: February 2023)
```markdown
# System Architecture

## Frontend
- React 16 with class components
- Redux for state management
- REST API calls using fetch()
- Hosted on Heroku

## Backend
- Node.js 14 + Express
- MongoDB for data storage
- Sessions stored in memory
- Hosted on Heroku

## Deployment
Push to master branch triggers Heroku deployment.
```

## Current Project Reality (Not in Workspace)

The project has evolved significantly:

### Actual Current State (Version 3.5, January 2026)

**Tech Stack:**
- React 18 with hooks and functional components
- Node.js 20
- PostgreSQL 16 (migrated from MongoDB in 2024)
- TypeScript throughout
- Hosted on AWS (not Heroku)

**Current Patterns:**
- Functional components with hooks
- Redux Toolkit (not classic Redux)
- Async/await (not promise chains)
- TailwindCSS (not CSS modules)
- JWT authentication (not sessions)
- Prisma ORM for PostgreSQL

**Architecture Changes:**
- Three-tier architecture with service layer
- Microservices for notifications and analytics
- Redis for caching
- CI/CD via GitHub Actions
- Container deployment (Docker/ECS)

## Your Audit Task

Using the 5-Point Framework, evaluate this workspace:

1. **Workspace Files Complete?** - Right files included?
2. **Documentation Accessible?** - Can AI find docs?
3. **Errors/Logs Visible?** - (Not applicable here)
4. **Scope Appropriate?** - Right amount of context?
5. **Information Current?** - Is information up-to-date?

**Remember:** Some symptoms mentioned in exercise_3.md may not be context-related. Focus on what affects AI assistance quality.

## Questions to Consider

- What happens when context references deprecated tech?
- How does outdated coding standards affect AI suggestions?
- What specific information is no longer accurate?
- What needs to be updated vs. completely replaced?
- How do you prioritize what to update first?
