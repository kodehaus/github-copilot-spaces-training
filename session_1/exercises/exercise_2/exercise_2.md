# Exercise 2: Practice Round 2 - Workflow Acceleration

**Duration:** 36 minutes

**Assessment Type:** Scenario Application

**Scaffolding Level:** Medium (Key decision points highlighted)

## Objectives

By completing this exercise, you will:
- Deepen your understanding of context engineering
- Practice diagnostic and troubleshooting skills
- Use context engineering to accelerate common development workflows
- Engineer effective context for different workflow types
- Demonstrate measurable improvement in task completion

## Scenario

Your team reports that GitHub Copilot isn't providing helpful suggestions for three common workflows:
1. **Debugging** - AI doesn't understand the error context
2. **Feature Development** - Suggestions don't match the architecture
3. **Code Review** - AI misses important style guide violations

Your task is to analyze what's missing and improve the context for each workflow.

## Instructions

### Decision Point 1: Debugging Workflow (12 minutes)

**Situation:** A teammate shows you an error message: `TypeError: Cannot read property 'id' of undefined`

1. **Analyze the Context Gap**
   - What information does the AI need to help debug this?
   - What context is currently missing?
   - What would make the AI response more helpful?

2. **Engineer the Context**
   - Add relevant error logs or stack traces
   - Include the code where the error occurs
   - Add related code that might cause the issue
   - Include test cases if available

3. **Test Your Solution**
   - Ask the AI to help debug the error
   - Evaluate if the response is more specific and actionable

### Decision Point 2: Feature Development Workflow (12 minutes)

**Situation:** You need to add a new user authentication feature.

1. **Analyze the Context Gap**
   - What architectural patterns should the AI follow?
   - What existing authentication code should it reference?
   - What security requirements must it know about?

2. **Engineer the Context**
   - Add architecture documentation
   - Include examples of existing similar features
   - Add security guidelines or requirements
   - Include API documentation if relevant

3. **Test Your Solution**
   - Ask the AI to help implement the feature
   - Check if suggestions align with your architecture

### Decision Point 3: Code Review Workflow (12 minutes)

**Situation:** The AI needs to help review code for style and best practices.

1. **Analyze the Context Gap**
   - What style guide should the AI follow?
   - What project-specific conventions exist?
   - What common issues should it watch for?

2. **Engineer the Context**
   - Add style guide documentation
   - Include examples of good code from your project
   - Add linting rules or configuration files
   - Include common code review checklist

3. **Test Your Solution**
   - Give the AI some code to review
   - Check if it catches relevant issues

## Success Criteria

- [ ] Engineered effective context for 3 different workflow types (debugging, feature development, code review)
- [ ] Demonstrated improvement in AI assistance quality for each workflow
- [ ] Adapted context strategy when initial approach was ineffective
- [ ] Provided evidence of improved results (before/after comparison)

## Key Decision Points

⚠️ **Decision Point A:** Should you add more context or remove irrelevant context?
- Consider: Is the AI confused by too much information, or missing key details?

⚠️ **Decision Point B:** Should context be broad or specific?
- Consider: What's the scope of the task? Broader tasks need broader context.

⚠️ **Decision Point C:** How do you verify that context is working?
- Consider: Compare AI responses before and after context changes.

## Hints Available (Request as Needed)

💡 **Hint 1 (Debugging):** Include not just the error, but the state of the application when the error occurred.

💡 **Hint 2 (Feature Development):** Look for similar features already implemented - they're great context examples.

💡 **Hint 3 (Code Review):** Your project's linting configuration and recent PR comments are valuable context sources.

## Deliverable

For each of the 3 workflows, provide:
1. Brief explanation of what context you added and why
2. Example of improved AI assistance (before/after comparison)
3. Explanation of your approach and any adjustments made

## Reflection

### Required Reflection Questions

1. What was most challenging about this assessment?

   _Your answer:_



2. How did your approach evolve from your first attempt?

   _Your answer:_



3. What would you do differently next time?

   _Your answer:_



4. How did this at-bat feel different from the previous one?

   _Your answer:_



5. What skills are becoming more automatic for you?

   _Your answer:_



6. How will you apply this skill in your real work?

   _Your answer:_




