---
marp: true
theme: default
paginate: true
---

# Exercise 2: Practice Round 2

## Workflow Acceleration

**Duration:** 36 minutes
**Scaffolding:** Medium (Key decision points highlighted)

---

# Your Objectives

By completing this exercise, you will:

- 🎯 Deepen understanding of context engineering
- 🎯 Practice diagnostic and troubleshooting skills
- 🎯 Use context engineering to accelerate workflows
- 🎯 Engineer effective context for different workflow types
- 🎯 Demonstrate measurable improvement in task completion

---

# The Scenario

**Your team has problems with 3 workflows:**

1. 🐛 **Debugging** - AI doesn't understand error context
2. ⚡ **Feature Development** - Suggestions don't match architecture
3. 👁️ **Code Review** - AI misses style guide violations

**Your task:** Analyze what's missing and improve context for each

---

# Decision Point 1: Debugging Workflow

**Time: 12 minutes**

---

# The Debugging Problem

**Situation:**

A teammate shows you an error:
```
TypeError: Cannot read property 'id' of undefined
```

The AI isn't helping effectively. **Why?**

---

# Step 1: Analyze the Context Gap

**Ask yourself:**

- What information does the AI need to help debug this?
- What context is currently missing?
- What would make the AI response more helpful?

⚠️ **Decision Point:** What context is MOST important for debugging?

---

# Step 2: Engineer the Context

**Add these elements:**

- 📋 Relevant error logs or stack traces
- 💻 Code where the error occurs
- 🔗 Related code that might cause the issue
- ✅ Test cases if available

💡 **Tip:** The AI needs to see the STATE of the app when error occurred

---

# Step 3: Test Your Solution

**Validate your changes:**

1. Ask the AI to help debug the error
2. Evaluate if the response is more specific and actionable

✅ **Success:** AI gives specific line numbers and fixes
❌ **Needs work:** Still getting generic debugging advice

---

# Decision Point 2: Feature Development

**Time: 12 minutes**

---

# The Feature Development Problem

**Situation:**

You need to add a new user authentication feature.

AI suggestions don't match your architecture. **Why?**

---

# Step 1: Analyze the Context Gap

**Ask yourself:**

- What architectural patterns should the AI follow?
- What existing authentication code should it reference?
- What security requirements must it know about?

⚠️ **Decision Point:** Should you add MORE context or BETTER context?

---

# Step 2: Engineer the Context

**Add these elements:**

- 📐 Architecture documentation
- 🔐 Examples of existing similar features
- 🛡️ Security guidelines or requirements
- 📡 API documentation if relevant

💡 **Tip:** Show the AI HOW your team structures similar features

---

# Step 3: Test Your Solution

**Validate your changes:**

1. Ask the AI to help implement the feature
2. Check if suggestions align with your architecture

✅ **Success:** Code matches your patterns and standards
❌ **Needs work:** Still getting generic implementations

---

# Decision Point 3: Code Review

**Time: 12 minutes**

---

# The Code Review Problem

**Situation:**

The AI needs to help review code for style and best practices.

But it's missing important issues. **Why?**

---

# Step 1: Analyze the Context Gap

**Ask yourself:**

- What style guide should the AI follow?
- What project-specific conventions exist?
- What common issues should it watch for?

⚠️ **Decision Point:** What makes YOUR team's code reviews unique?

---

# Step 2: Engineer the Context

**Add these elements:**

- 📝 Style guide documentation
- ⭐ Examples of good code from your project
- ⚙️ Linting rules or configuration files
- ✅ Common code review checklist

💡 **Tip:** Include BOTH rules (style guide) and examples (actual code)

---

# Step 3: Test Your Solution

**Validate your changes:**

1. Give the AI some code to review
2. Check if it catches relevant issues

✅ **Success:** AI identifies style violations specific to your team
❌ **Needs work:** Only catching generic issues

---

# Success Criteria

**You're successful if:**

- [ ] Engineered effective context for all 3 workflow types
- [ ] Demonstrated improvement in AI assistance quality
- [ ] Adapted strategy when initial approach was ineffective
- [ ] Provided evidence of improved results (before/after)

---

# Key Decision Points Summary

**Remember these trade-offs:**

⚠️ **Decision A:** More context vs. Remove irrelevant context?
- Consider: Is the AI confused or missing info?

⚠️ **Decision B:** Broad context vs. Specific context?
- Consider: What's the scope of the task?

⚠️ **Decision C:** How to verify context is working?
- Consider: Compare before/after AI responses

---

# Hints Available 💡

**Request these if you need help:**

🔹 **Hint 1 (Debugging):** Include not just the error, but the STATE of the application when error occurred

🔹 **Hint 2 (Feature Development):** Look for similar features already implemented - they're great context examples

🔹 **Hint 3 (Code Review):** Your linting config and recent PR comments are valuable context sources

---

# What to Submit

**For EACH of the 3 workflows:**

1. Brief explanation of what context you added and why
2. Example of improved AI assistance (before/after comparison)
3. Explanation of your approach and any adjustments made

---

# Reflection Questions

**Take time to reflect:**

1. What was most challenging about this assessment?
2. How did your approach evolve from your first attempt?
3. What would you do differently next time?
4. How did this at-bat feel different from the previous one?
5. What skills are becoming more automatic for you?
6. How will you apply this skill in your real work?

---

# Let's Get Started!

**Remember:**
- You have 36 minutes total (12 min per workflow)
- Medium scaffolding - key decision points highlighted
- Focus on quality over quantity
- Even completing 1 workflow well = success!

**Ready? Begin with Debugging Workflow!**

---
