# Old Development Notes

## Meeting Notes from 2022

We decided to use Angular for the frontend. Mike said it would be better than React.

## Server Setup

The server runs on port 3000. Or was it 8080? Check with Steve.

## Database

We're using MongoDB. Make sure to install version 3.6.

**Update (June 2023):** Actually we switched to PostgreSQL but these notes might still be useful.

## Authentication

Currently using passport.js with session-based auth. Planning to switch to JWT "soon."

## API Endpoints

```
/users - get users
/tasks - get tasks  
/projects - get projects
```

(More endpoints exist but not documented)

## Deployment

FTP the files to the server. Ask Bob for credentials.

**DO NOT DEPLOY ON FRIDAYS**

## Code Style

We're not really consistent yet. Just try to match whatever file you're working in.

## Testing

Tests would be nice to have. Maybe write some eventually.

## Known Issues

- Auth sometimes breaks
- Pagination doesn't work right
- Search is slow
- Users report crashes but we can't reproduce

Will fix these when we have time.

---

*Last updated: Sometime in 2023? Maybe 2024?*
