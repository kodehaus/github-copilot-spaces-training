# Workspace A: Overloaded Context

This workspace represents a team that added "everything" to their Copilot Space without curation.

## Current Symptoms

When team members use this workspace:
- AI responses are slow (3-5 seconds per suggestion)
- Suggestions are generic and don't reference project specifics
- AI seems "confused" and provides inconsistent advice

## Files in This Workspace

Review the file listing below. These are the 50+ files currently included in the workspace context:

### Documentation (10 files)
- README.md (project overview)
- ARCHITECTURE.md (system design)
- API_DOCS.md (API reference)
- SETUP.md (getting started)
- DEPLOYMENT.md (deployment guide)
- TROUBLESHOOTING.md (common issues)
- CHANGELOG.md (2000+ lines, 4 years of changes)
- MEETING_NOTES_2022.md (old planning notes)
- MEETING_NOTES_2023.md (more old notes)
- BRAINSTORM_IDEAS.md (random future ideas)

### Configuration Files (12 files)
- package.json
- tsconfig.json
- .eslintrc.json
- .prettierrc
- jest.config.js
- webpack.config.js
- docker-compose.yml
- .env.example
- .gitignore
- .nvmrc
- .editorconfig
- vite.config.ts

### Source Code (20 files)
- src/index.ts
- src/app.ts
- src/server.ts
- src/config/*.ts (5 config files)
- src/utils/*.ts (8 utility files)
- src/middleware/*.ts (4 middleware files)
- src/constants.ts
- src/types.ts

### Tests (15 files)
- tests/unit/*.test.ts (8 unit test files)
- tests/integration/*.test.ts (5 integration tests)
- tests/e2e/*.test.ts (2 e2e tests)

### Build & Generated (10 files)
- dist/bundle.js (minified production build, 50,000+ lines)
- dist/bundle.js.map (source map, 100,000+ lines)
- coverage/lcov-report/index.html (test coverage report)
- node_modules/some-library/README.md (accidentally included)
- package-lock.json (15,000+ lines of dependency lock)
- .next/cache/data.json (Next.js cache file)
- public/assets/data.json (static data file)
- docs/api-generated.html (auto-generated docs, 5000+ lines)
- .cache/some-cache-file (build cache)
- temp/debug-output.log (temporary debug file, 2000+ lines)

## Your Audit Task

Using the 5-Point Framework, evaluate this workspace:

1. **Workspace Files Complete?** - Anything important missing?
2. **Documentation Accessible?** - Can AI find relevant docs?
3. **Errors/Logs Visible?** - (Not applicable for this workspace type)
4. **Scope Appropriate?** - Too much or too little?
5. **Information Current?** - Everything up-to-date?

**Remember:** Some symptoms mentioned in exercise_3.md may not be context-related. Focus on what affects AI assistance quality.

## Questions to Consider

- Which files are essential vs. nice-to-have vs. unnecessary?
- What's the impact of including generated/build files?
- How might old documentation affect AI suggestions?
- What happens when context includes 100,000+ lines of code?
- Which files would most help AI understand the project?
