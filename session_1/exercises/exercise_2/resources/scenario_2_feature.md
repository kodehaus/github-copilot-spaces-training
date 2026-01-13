# Scenario 2: Feature Development Workflow

**Duration:** 12 minutes  
**Workflow Type:** New Feature Implementation

---

## The Situation

Your product manager assigns you a new feature:

> **Story #3421: Two-Factor Authentication (2FA)**
> 
> **As a** user concerned about security  
> **I want** to enable two-factor authentication on my account  
> **So that** my data is protected even if my password is compromised
> 
> **Acceptance Criteria:**
> - Users can enable 2FA via account settings
> - Support TOTP (Time-based One-Time Password) using authenticator apps
> - Require 2FA code during login if enabled
> - Provide backup codes for account recovery
> - Send email notification when 2FA is enabled/disabled

---

## Current State

When you ask Copilot to help implement this feature, you get responses like:

> "To implement two-factor authentication, you can use the `speakeasy` library for generating TOTP tokens. Here's a basic example:
> 
> ```javascript
> const speakeasy = require('speakeasy');
> const secret = speakeasy.generateSecret();
> ```
> "

**This is a generic starting point but doesn't help with:**
- How should this integrate with your existing authentication system?
- Where should 2FA logic live in your architecture?
- What's the user flow in your application?
- How should this align with your security policies?
- What testing approach should you use?

---

## Project Context

Your application architecture:

**Authentication System:**
- Currently uses JWT tokens for session management
- Login handled by `AuthService` → `AuthController` → frontend login form
- User model stored in PostgreSQL via Prisma ORM
- Password hashing with bcrypt
- Session tokens stored in Redis (7-day expiration)

**Existing Security Features:**
- Email verification on signup
- Password reset via email token
- Password strength requirements (defined in validation rules)
- Rate limiting on auth endpoints (5 attempts per 15 minutes)
- Security audit logging for all auth events

**Project Structure:**
```
backend/src/
├── controllers/
│   ├── auth.controller.ts       # Existing login/signup endpoints
│   └── user.controller.ts       # User profile management
├── services/
│   ├── auth.service.ts          # Authentication logic
│   ├── email.service.ts         # Email notifications
│   └── user.service.ts          # User operations
├── models/
│   └── user.model.ts           # User data structure
└── middleware/
    └── auth.middleware.ts       # JWT verification
```

**Similar Existing Feature: Email Verification**
Your project already has a similar two-step verification flow:
1. User signs up → account created (unverified)
2. Email sent with verification token
3. User clicks link → account verified → full access granted

This could be a good reference pattern for 2FA implementation.

---

## Requirements & Constraints

**Security Requirements:**
- 2FA secrets must be encrypted at rest
- Backup codes must be hashed (don't store plain text)
- 2FA setup requires password re-entry for confirmation
- Failed 2FA attempts should count toward rate limiting
- Audit log all 2FA events (enabled, disabled, failed attempts)

**Technical Constraints:**
- Must work with existing JWT authentication flow
- Cannot break existing login for users without 2FA
- Must be backwards compatible with mobile app (API v1)
- Response times must stay under 200ms (current SLA)

**Testing Requirements:**
- Unit tests for all 2FA service methods
- Integration tests for login flow with 2FA enabled
- E2E tests for user enabling/disabling 2FA
- Security tests for common attack vectors

---

## Your Task

**Analyze:** What context does the AI need to implement this feature correctly?

Consider:
- What architectural patterns should it follow?
- What existing code should it reference?
- What security requirements must it know?
- What testing patterns should it use?

**Engineer:** Add appropriate context to your Copilot Space

Think about:
- Architecture documentation (how auth works)
- Existing authentication code (as reference)
- Similar features (email verification pattern)
- Security requirements and constraints
- Testing approach and examples
- API design patterns

**Test:** Ask the AI to help implement the feature

Try questions like:
- "How should I implement 2FA in this application?"
- "Where should the 2FA verification logic live?"
- "What changes are needed to the User model for 2FA?"
- "How do I integrate 2FA with the existing JWT login flow?"

**Evaluate:** Does the AI response align with your architecture?

---

## Success Indicators

✅ **Good AI response includes:**
- Follows your three-tier architecture (controller → service → repository)
- References existing AuthService patterns
- Suggests integration with existing JWT flow
- Considers your security requirements (encryption, hashing)
- Proposes testing aligned with your test structure
- Uses TypeScript and Prisma patterns from your project

❌ **Generic AI response includes:**
- Generic Node.js examples not matching your structure
- No reference to existing auth patterns
- JavaScript examples (you use TypeScript)
- Different ORM or database approach
- No consideration of your security constraints
- Generic testing advice not specific to your setup

---

## Reflection Questions

After completing this scenario:

1. What architecture context was most critical?
2. How did including similar existing features help the AI?
3. What security requirements influenced the AI's suggestions?
4. How would you approach feature development scenarios in the future?
