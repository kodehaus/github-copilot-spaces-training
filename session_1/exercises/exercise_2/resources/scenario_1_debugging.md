# Scenario 1: Debugging Workflow

**Duration:** 12 minutes  
**Workflow Type:** Bug Investigation and Fix

---

## The Situation

Your teammate Sarah sends you a Slack message:

> "Hey! I'm getting this error when users try to update their profile. Can you help? 🆘"

```
TypeError: Cannot read property 'id' of undefined
    at UserService.updateProfile (user.service.ts:45)
    at async UserController.update (user.controller.ts:89)
```

She adds: "It works fine for some users but not others. Started happening after yesterday's deployment."

---

## Current State

When you ask Copilot for help with this error, you get generic responses like:

> "This error occurs when you're trying to access the 'id' property of an undefined object. Check that the object exists before accessing its properties. You can use optional chaining: `object?.id`"

**This is technically correct but not actionable.** It doesn't help you understand:
- Why is the object undefined for some users but not others?
- What changed in yesterday's deployment that could cause this?
- Which specific object is undefined?
- How to reproduce the issue?

---

## Additional Information You Can Gather

Sarah provides more details when you ask:

**Error occurs when:**
- User tries to update their profile settings
- Only happens for users with "Premium" subscription type
- Started after deploying PR #1247 (subscription tier refactoring)

**Relevant code file: `user.service.ts` (line 45)**
```typescript
async updateProfile(userId: string, data: UpdateProfileDto) {
  const user = await this.userRepository.findById(userId);
  
  // Line 45: Error happens here
  const subscriptionId = user.subscription.id;
  
  // Rest of update logic...
}
```

**Recent change from PR #1247:**
- Changed subscription relationship from embedded to referenced
- Some users have `subscription` as an object, others as a reference ID
- Migration script was supposed to update all users but may have missed some

---

## Your Task

**Analyze:** What context does the AI need to help you debug this effectively?

Consider:
- What code should be included in your workspace?
- What error information is relevant?
- What recent changes might be related?
- What would help the AI understand the data model?

**Engineer:** Add appropriate context to your Copilot Space

Think about:
- The error message and stack trace
- The code where the error occurs
- Related code (repository, data models)
- Recent changes that might be relevant
- Test data or reproduction steps

**Test:** Ask the AI for help again

Try questions like:
- "Help me debug this TypeError in user.service.ts"
- "Why would user.subscription be undefined for Premium users?"
- "How should I safely access the subscription ID?"

**Evaluate:** Is the AI response now more specific and actionable?

---

## Success Indicators

✅ **Good AI response includes:**
- Specific reference to your code structure
- Understanding of the subscription model change
- Concrete suggestions for fixing the migration issue
- Safe code patterns for handling both old and new data formats
- Specific line numbers and file references from your project

❌ **Generic AI response includes:**
- General JavaScript/TypeScript advice
- No reference to your specific code
- Generic null-checking suggestions
- No understanding of the migration context

---

## Reflection Questions

After completing this scenario:

1. What context was most important for debugging help?
2. How did adding error context improve AI suggestions?
3. What surprised you about what context was needed?
4. How would you approach debugging scenarios differently in the future?
