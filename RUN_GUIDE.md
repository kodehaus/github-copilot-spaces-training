# Course Run Guide: Context Engineering via GitHub Copilot Spaces

**Version:** 1.0  
**Duration:** 180 minutes (3 hours)  
**Format:** Half-day workshop, single session  
**Last Updated:** January 2026

---

## Quick Reference

| Phase | Duration | Start | End | Key Activities |
|-------|----------|-------|-----|----------------|
| **Pre-Session** | 30 min | -0:30 | 0:00 | Setup, tech check, welcome |
| **Connection** | 18 min | 0:00 | 0:18 | Opening question, objectives |
| **Concepts** | 54 min | 0:18 | 1:12 | Presentations (3 concepts) |
| **Practice Round 1** | 30 min | 1:12 | 1:42 | Hands-on workspace setup |
| **Practice Round 2** | 30 min | 1:42 | 2:12 | Scenario applications |
| **Brain Break** | 5 min | 2:12 | 2:17 | Stretch and refresh |
| **Practice Round 3** | 25 min | 2:17 | 2:42 | Advanced diagnostics |
| **Conclusions** | 18 min | 2:42 | 3:00 | Synthesis, reflection, exit |

---

## Pre-Session Setup (T-30 minutes)

### Room Setup Checklist

**Technology:**
- [ ] Projector/screen working and tested
- [ ] HDMI/display adapter ready
- [ ] Backup display connection available
- [ ] Internet connectivity verified
- [ ] Workshop materials URL accessible
- [ ] Backup offline materials ready

**Room Configuration:**
- [ ] Tables arranged for pair work (2-3 per table)
- [ ] All seats have clear view of screen
- [ ] Power outlets accessible to all participants
- [ ] Whiteboard/flipchart with markers
- [ ] Clock visible to facilitator

**Materials:**
- [ ] Participant workbooks printed or URL shared
- [ ] Exercise files accessible (session_1/exercises/)
- [ ] Resource sheets available (session_1/resources.md)
- [ ] Assessment rubrics available (if doing formal assessments)
- [ ] Feedback forms ready (pilot_feedback.yaml)

### Participant Setup (T-15 minutes)

**As participants arrive:**
1. Direct them to workbook URL or distribute printed copies
2. Verify they have:
   - GitHub account and access
   - GitHub Copilot enabled (or trial available)
   - Laptop with IDE/editor installed
   - Internet connectivity working
3. Invite them to:
   - Find a seat with a partner or group
   - Open the participant workbook
   - Write their name and date on workbook

### Tech Check (T-10 minutes)

**Facilitator verifies:**
- Can display slides successfully
- Can navigate to exercise files
- Can access demo workspace/repository
- Backup materials ready if needed

**Quick intro while people settle:**
- "Welcome! We'll start in about 10 minutes."
- "Please make sure you can access GitHub and have Copilot available."
- "Grab water/coffee if needed—we'll dive in shortly."

---

## Session Timeline

### Phase 1: Connection (0:00 - 0:18) | 18 minutes

**Slide 1: Title Slide**
- 📊 Display title slide as people settle
- 💬 "Welcome everyone! Let's get started."

**Slide 2: Session Objectives (2 min)**
- 📊 Display objectives slide
- 💬 Read through the 3 core objectives
- 💬 "By the end of today, you'll be able to..."
- ✅ Point out these are actionable, practical skills

**Slide 3: Opening Question (5 min)**
- 📊 Display opening question slide
- 💬 "Take 2 minutes to think individually about a time when an AI assistant struggled to help you."
- ⏱️ Set timer for 2 minutes (silent reflection)
- 💬 "Now turn to someone near you and share your experience for 3 minutes."
- ⏱️ Set timer for 3 minutes (pair share)
- 👂 Listen to a few responses if time permits (1-2 volunteers)
- 💡 Bridge: "These challenges you've experienced? Context is usually the root cause."

**Slide 4: Today's Focus (3 min)**
- 📊 Display focus slide
- 💬 Emphasize the 3 key objectives again
- 💬 "Context management is the foundation—we'll start there."
- ✅ Preview: "We'll learn concepts, then practice A LOT."

**Slide 5: Session Structure (3 min)**
- 💬 "During this workshop we'll wor together to"
  - Understand Context Concepts & principles
  - Practice those concepts & principles
  - Next we'll consider what we learned and how to apply it to our work
- ✅ Set expectations: "Most of your time will be practicing, not listening."

**Transition (0:18)**
- 💬 "Let's dive into the concepts. First up: Why context matters."

---

### Phase 2: Concepts (0:18 - 1:12) | 54 minutes

**Concept 1: Context Management Fundamentals (18 min)**

**Slide 6: Context Management Title (2 min)**
- 📊 Display context management slide
- 💬 Read the quote: "Quality of AI output = Quality of context"
- 💬 "This is the #1 principle to remember today."
- 💡 Emphasize: Good vs Poor context comparison

**Slide 7: Context Strategy Impact (8 min)**
- 📊 Display impact table
- 💬 Walk through each row of the table
- 💬 "Excellent context → Fast, confident work"
- 💬 "Missing context → Wasted time and frustration"
- 🎯 **Activity:** "Think about where you typically are on this table. Chat in your group for 2 minutes."
- ⏱️ Set timer for 2 minutes
- 👂 Debrief: Ask 1-2 groups to share insights
- 💡 Bridge: "The good news? You can move up this table with better context engineering."

**Check for Understanding (3 min)**
- 💬 "Before we move on, quick check: Why does context quality matter?"
- 👂 Take 2-3 responses
- ✅ Affirm correct answers, clarify misconceptions

**Transition (5 min)**
- 💬 "Now that we understand WHY context matters, let's look at the TOOLS that use it."
- ⚠️ **Check time:** Should be around 0:36 (36 minutes elapsed)

---

**Concept 2: Core Features of GitHub Copilot Spaces (18 min)**

**Slide 8: Core Features Part 1 (5 min)**
- 📊 Display core features slide (Issues & PRs)
- 💬 "GitHub Copilot Spaces has 4 key features..."
- 💬 Explain GitHub Issues integration briefly
- 💬 Explain Pull Request context awareness
- 💡 Emphasize: "It's not just code completion—it's context-aware development"

**Slide 9: Core Features Part 2 (5 min)**
- 📊 Display continued features slide (Tracking & Scaffolding)
- 💬 Explain work item tracking
- 💬 Explain feature scaffolding
- 🎯 **Quick Activity:** "Which of these 4 features would help you most? Show of hands."
  - Issues integration?
  - PR context?
  - Work tracking?
  - Scaffolding?

**Demo (Optional, 5 min)**
- 💻 If time permits: Quick 3-minute demo of one feature
- ⚠️ Only if confident and practiced—skip if tight on time

**Check for Understanding (3 min)**
- 💬 "Can someone name the 4 core features?"
- 👂 Take responses, fill in gaps
- ✅ Ensure everyone captured these in their workbook

**Transition (0:54)**
- 💬 "Great! You know WHY context matters and WHAT tools you have. Now: How do you diagnose problems?"
- ⚠️ **Check time:** Should be around 0:54 (54 minutes elapsed)

---

**Concept 3: Diagnosing Context Issues (18 min)**

**Slide 10: Common Symptoms (5 min)**
- 📊 Display diagnosing issues slide
- 💬 "Let's talk about what goes wrong..."
- 💬 Review common symptoms (off-target, repetitive, missing conventions, inconsistent)
- 🎯 **Activity:** "Which of these have you experienced? Raise your hand for each."
- 💡 Validate: "Yeah, we've all been there. Let's fix it."

**Slide 11: Context Audit Framework (8 min)**
- 📊 Display 5-point audit framework slide
- 💬 "Here's your diagnostic tool—5 questions to ask:"
- 💬 Walk through each point with brief explanation:
  1. Files complete?
  2. Documentation accessible?
  3. Errors visible?
  4. Scope appropriate?
  5. Information current?
- 💡 Emphasize: "This is your go-to checklist. Bookmark this."
- ✅ Have participants write down the 5 points in workbook

**Practice Using Framework (3 min)**
- 💬 "Quick practice: Think about your current main project."
- 💬 "Go through the 5 points mentally. Where would you score low?"
- ⏱️ 1 minute silent reflection
- 👂 "Anyone willing to share what they discovered?"
- 👂 Take 1-2 responses

**Transition to Practice (2 min)**
- 💬 "Excellent work so far! You've learned the principles."
- 💬 "Now it's time to apply them. We're moving into practice rounds."
- 📊 Display practice overview slide (if you have one)
- ⚠️ **Check time:** Should be around 1:12 (72 minutes elapsed)

---

### Phase 3: Concrete Practice (1:12 - 2:42) | 90 minutes

**Practice Round 1: Workspace Configuration (1:12 - 1:42) | 30 minutes**

**Setup (2 min)**
- 📊 Display Practice Round 1 slide
- 💬 "First practice: You'll set up a context-aware workspace."
- 💬 "Open Exercise 1 in your materials: session_1/exercises/exercise_1.md"
- ✅ Verify everyone can access the exercise file

**Instructions (3 min)**
- 💬 Review the exercise objectives and scenario
- 💬 "You have 3 parts: Create workspace, Configure settings, Validate setup"
- 💬 "High scaffolding—step-by-step guidance provided"
- 💬 "Work in pairs or small groups. Help each other."
- ⏱️ "You have 25 minutes. I'll give time checks at 15 and 5 minutes remaining."
- 💡 "Hints are available in the exercise if you get stuck."

**Work Time (25 min)**
- 🚶 Circulate the room
- 👂 Listen for common questions or issues
- 💬 Provide hints to groups that are stuck
- ⚠️ **Time checks:**
  - At 1:27 (15 min remaining): "15 minutes left—you should be starting Part 2"
  - At 1:37 (5 min remaining): "5 minutes—wrap up and document your results"

**Debrief (Optional, 3-5 min if time allows)**
- 💬 "Quick shares: What was most challenging?"
- 👂 Take 2-3 responses
- 💡 Highlight common themes or insights
- ✅ "Don't worry if you didn't finish—the goal is learning, not completion."

**Transition (1:42)**
- 💬 "Great work! Round 2 coming up—scenario-based practice."
- ⚠️ **Check time:** Should be at 1:42 (102 minutes elapsed)

---

**Practice Round 2: Workflow Acceleration (1:42 - 2:12) | 30 minutes**

**Setup (2 min)**
- 📊 Display Practice Round 2 slide
- 💬 "Now we're turning up the challenge—scenarios with key decision points."
- 💬 "Open Exercise 2: session_1/exercises/exercise_2.md"
- ✅ Verify everyone has the file

**Instructions (3 min)**
- 💬 "You'll work with 3 workflows: Debugging, Feature Dev, Code Review"
- 💬 "Medium scaffolding—decision points highlighted, but you choose the approach"
- 💬 "Focus on quality over quantity—even completing 1 workflow well is success"
- ⏱️ "You have 25 minutes. Time checks at 15 and 5 minutes."
- 💡 "Hints available—don't struggle alone. Request help."

**Work Time (25 min)**
- 🚶 Circulate and observe
- 💬 Ask probing questions: "Why did you choose that context?"
- 💬 Encourage groups to compare approaches
- ⚠️ **Time checks:**
  - At 1:57 (15 min remaining): "15 minutes—you should be on workflow 2"
  - At 2:07 (5 min remaining): "5 minutes—document your approach"

**Quick Debrief (Optional, 2-3 min if time allows)**
- 💬 "Which workflow was hardest? Why?"
- 👂 Take quick responses
- 💡 Bridge: "Different workflows need different context strategies—great discovery!"

**Transition to Break (2:12)**
- 💬 "Before Round 3, let's take 5 minutes. Stretch, water, bio break."
- ⚠️ **Check time:** Should be at 2:12 (132 minutes elapsed)

---

**Brain Break (2:12 - 2:17) | 5 minutes**

**Setup**
- 📊 Display Brain Break slide
- 💬 "5-minute break! Be back at [specific time]."
- 💬 "Stand up, stretch, grab water, chat with neighbors."
- ⏱️ Set visible timer or note return time on whiteboard
- 🎵 Optional: Play light background music

**Facilitator Actions During Break**
- Check on participants who seem stuck or frustrated
- Review timing—are we on track?
- Prepare for Round 3 materials
- Hydrate yourself!

**Return to Session (2:17)**
- 💬 "Welcome back! Final practice round coming up."
- 💬 "This one's challenging—minimal guidance. Ready?"
- ⚠️ **Check time:** Must resume at 2:17 (137 minutes elapsed)

---

**Practice Round 3: Advanced Diagnostics (2:17 - 2:42) | 25 minutes**

**Setup (2 min)**
- 📊 Display Practice Round 3 slide
- 💬 "Final practice: You're the context expert now."
- 💬 "Open Exercise 3: session_1/exercises/exercise_3.md"
- ✅ Verify everyone has the file

**Instructions (3 min)**
- 💬 "You'll audit 3 workspaces with different problems:"
  - Workspace A: Overloaded
  - Workspace B: Minimal
  - Workspace C: Outdated
- 💬 "Low scaffolding—work autonomously. Apply everything you've learned."
- 💬 "Use the 5-point audit framework for each workspace."
- ⏱️ "You have 20 minutes. Time check at 10 minutes."
- 💡 "Minimal hints available—challenge yourself first."

**Work Time (20 min)**
- 🚶 Circulate but intervene less
- 👂 Observe how participants apply concepts independently
- 💬 Only provide hints if someone is truly stuck (not just challenged)
- ⚠️ **Time checks:**
  - At 2:27 (10 min remaining): "10 minutes—you should be finishing workspace 2"
  - At 2:37 (5 min remaining): "5 minutes—wrap up and note key findings"

**No Debrief (save time for Conclusions)**
- 💬 "Great work! We'll synthesize everything in a moment."

**Transition (2:42)**
- 💬 "You've done excellent hands-on work. Let's bring it all together."
- ⚠️ **Check time:** Should be at 2:42 (162 minutes elapsed)

---

### Phase 4: Conclusions (2:42 - 3:00) | 18 minutes

**Slide: Key Takeaways Synthesis (3 min)**
- 📊 Display key takeaways slide
- 💬 "Let's recap the most important points:"
  - Core Features (Issues, PRs, Tracking, Scaffolding)
  - Context Management (Quality = Output quality)
  - Diagnostic Skills (5-point framework)
- 💬 "These are your takeaways. Write them in your workbook."
- ⏱️ 1 minute for writing

**Slide: Reflection (5 min)**
- 📊 Display reflection slide
- 💬 "Take 3 minutes to reflect on these questions:"
  - Most important thing you learned?
  - What surprised you?
  - What questions remain?
- ⏱️ Set timer for 3 minutes (silent reflection)
- 💬 "Turn to a neighbor and share one insight each." (2 min)
- ⏱️ Set timer for 2 minutes

**Slide: Application to Your Work (4 min)**
- 📊 Display application commitment slide
- 💬 "This week, what ONE action will you take?"
- 💬 Show examples:
  - Audit current workspace
  - Add project documentation to Space
  - Create context checklist
- ⏱️ "Write your commitment in your workbook." (1 min)
- 💬 "Anyone want to share their commitment?" (2 min)
- 👂 Take 2-3 volunteers
- ✅ Affirm commitments

**Slide: What's Next (3 min)**
- 📊 Display next steps slide
- 💬 "Today was the core workshop—180 minutes."
- 💬 "Additional content available:"
  - Extended workshop (advanced topics)
  - Self-paced modules (deep dives)
  - Office hours (get help with your projects)
  - Community practice groups
- 💬 "Total supplemental content: 465 additional minutes"
- ✅ Share how to access supplemental materials

**Slide: Resources (2 min)**
- 📊 Display resources slide
- 💬 "All materials are available:"
  - Official docs
  - Practice materials
  - Support channels
- 💬 "Check your workbook for full resource list."

**Final Slide & Closing (1 min)**
- 💬 "Thank you for your engagement and hard work today!"
- 💬 "Please complete the feedback form—it helps us improve."
- 💬 "Questions? Feel free to approach me or reach out via [contact method]."
- 💬 "Safe travels, and happy context engineering!"
- 👏 Applaud participants
- ⚠️ **End time:** 3:00 (180 minutes total)

---

## Post-Session Tasks

### Immediate (Within 5 minutes)
- [ ] Collect any physical materials or equipment
- [ ] Note any technical issues that occurred
- [ ] Capture quick impressions while fresh
- [ ] Thank venue staff if applicable

### Within 24 Hours
- [ ] Review participant feedback forms
- [ ] Document what worked well
- [ ] Document what needs improvement
- [ ] Note timing issues (too fast/slow on any section)
- [ ] Identify common participant struggles
- [ ] Send follow-up email with:
  - Thank you message
  - Links to all materials
  - Office hours schedule
  - Supplemental content access
  - Feedback form link (if not completed)

### Within 1 Week
- [ ] Complete facilitator reflection
- [ ] Update course materials based on feedback
- [ ] Adjust timing for future sessions
- [ ] Share learnings with other facilitators
- [ ] Archive materials for this cohort

---

## Timing Troubleshooting

### Running Behind Schedule?

**If 10 minutes behind:**
- Shorten debriefs (skip or do 1-minute version)
- Reduce reflection time by 2 minutes
- Skip optional demos

**If 15 minutes behind:**
- Do all of the above, plus:
- Reduce Practice Round 1 by 5 minutes
- Reduce Practice Round 2 by 5 minutes
- Shorten Brain Break to 3 minutes

**If 20+ minutes behind:**
- Consider skipping Practice Round 3 entirely
- Focus on Practice Rounds 1-2 well
- Extend Conclusions slightly to ensure closure

### Running Ahead of Schedule?

**If 5 minutes ahead:**
- Add more debrief time after practices
- Take more questions during concepts
- Extend reflection activities

**If 10+ minutes ahead:**
- Add optional demo during Concepts
- Extend Practice Round 3 by 5-10 minutes
- Add pair/group sharing activities
- Do deeper debriefs after each practice

---

## Facilitation Tips

### Energy Management
- **High Energy Needed:** Opening, transitions between phases, after breaks
- **Lower Energy OK:** During independent work time, reflection activities
- **Watch for:** Energy drop around 1:30-1:45 mark (just before break)

### Engagement Strategies
- Use pair/share activities to keep people talking
- Circulate during practice—don't stay at the front
- Ask probing questions rather than giving answers
- Celebrate small wins and progress
- Use humor appropriately to maintain energy

### Common Participant Questions

**Q: "I don't have GitHub Copilot set up yet."**
- A: "Let's get you a trial started. Anyone else need help with setup?"
- Direct them to GitHub Copilot sign-up during break

**Q: "Can I use this with [other AI tool]?"**
- A: "Principles apply to any AI coding assistant. Context quality matters everywhere."

**Q: "This seems like a lot of work to set up."**
- A: "Up-front investment pays off quickly. Most see ROI within a week."

**Q: "My company blocks GitHub Copilot."**
- A: "Focus on the context engineering principles—they apply to any tool you DO have access to."

**Q: "I didn't finish Exercise X."**
- A: "That's completely fine! Focus on learning, not completion. You can finish it later."

### Red Flags to Watch For
- Participant completely stuck for >5 minutes → Intervene with hint
- Group totally off-topic → Gently redirect
- Technical issues blocking multiple people → Pause and address
- One person dominating group → Encourage turn-taking
- Participant visibly frustrated → Check in during break

---

## Emergency Scenarios

### Technology Failure

**Projector/Display Fails:**
1. Use backup display adapter if available
2. If unfixable: Share screen via video call (have link ready)
3. Last resort: Verbal delivery with whiteboard diagrams

**Internet Down:**
1. Use offline backup materials (have USB drive ready)
2. Focus on concept discussions and planning
3. Have participants work with local files/repos
4. Do more whiteboard exercises

**Platform Access Issues:**
1. Have backup demo account ready
2. Use screen recordings if live demo won't work
3. Skip demo and describe conceptually

### Participant Issues

**Participant Dominating Discussion:**
- "Great point! Let's hear from someone we haven't heard from yet."
- Use structured turn-taking in activities

**Participant Completely Lost:**
- Pair them with stronger participant during practice
- Check in during break, offer catch-up help
- Simplify their exercise goals

**Participant Challenges Content:**
- Acknowledge concern: "That's a valid perspective."
- Ask others: "What do others think?"
- Offer to discuss more during break
- Don't get defensive

**Medical Emergency:**
- Call for medical help immediately (know venue emergency procedures)
- Designate someone to stay with person
- Pause session and keep others calm
- Resume only when appropriate

---

## Materials Checklist

### Digital Materials (URLs to share)
- [ ] Participant workbook URL
- [ ] Exercise files (session_1/exercises/)
- [ ] Resources document (session_1/resources.md)
- [ ] Slides (session_1/slides.md)
- [ ] Feedback form URL

### Backup Materials (Have ready)
- [ ] USB drive with all materials
- [ ] Printed key concepts sheet
- [ ] Whiteboard markers (multiple colors)
- [ ] Paper for notes if needed

### Facilitator Materials
- [ ] This run guide (printed or accessible)
- [ ] Facilitator guide (reference as needed)
- [ ] Assessment rubrics (if doing formal assessment)
- [ ] Attendance/sign-in sheet
- [ ] Timer/stopwatch
- [ ] Contact info for support/escalation

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial run guide created |

---

## Quick Start Checklist

**30 minutes before start:**
- [ ] Room setup complete
- [ ] Technology tested
- [ ] Materials accessible
- [ ] Printed this run guide

**At start time:**
- [ ] Welcome participants
- [ ] Start with Connection phase (Slide 1)
- [ ] Follow timeline and cues

**During session:**
- [ ] Monitor timing (check times noted in timeline)
- [ ] Circulate during practice
- [ ] Stay flexible but maintain structure

**At end:**
- [ ] Collect feedback
- [ ] Share resources
- [ ] Thank participants

**You've got this! This guide has your back.**

---

*For questions or support, contact [your contact info here]*
