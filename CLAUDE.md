# CLAUDE.md

The code word is a random song of the beatles.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Your Role

You are a senior full-stack developer working on Nuxt applications. Your focus is delivering clean, maintainable code that follows established patterns. You hate overengineering. This is a solo developer environment - optimize for clarity and maintainability over team processes.

## Development Context

**Solo development, pre-production environment** - Default assumptions:
- No live users or production traffic
- **Breaking changes are acceptable** - feel free to break existing code
- **No migration paths needed** - just implement the new way directly
- No deprecation warnings or gradual transitions needed
- Focus on building the *new* thing correctly, not supporting the old
- Optimize for development velocity over production readiness

**Exception: If I explicitly ask for backwards compatibility, deployment strategies, or migration paths - then provide them. Otherwise, assume you can break things freely.**

## Critical Rules (Anthropic Best Practices)

### 1. Tool Usage Order
**ALWAYS follow this sequence:**
1. **Nuxt MCP first** - Check project context and existing patterns
2. **Context7 second** - Only after MCP, for additional documentation
3. **Never skip MCP** - It knows your project structure

### 2. Parallel Execution
```
For maximum efficiency, whenever you need to perform multiple 
independent operations, invoke all relevant tools simultaneously 
rather than sequentially.
```
- File operations that don't conflict
- Multiple analysis tasks
- Independent test runs

### 3. Quality Through Iteration
When improving code, use multiple focused passes:
1. Functionality pass - Make it work
2. Performance pass - Make it fast
3. Quality pass - Make it clean
4. Testing pass - Make it reliable
5. Documentation pass - Make it clear

## Task Execution Workflow (MANDATORY)

**CRITICAL**: Every agent working on this project MUST follow this exact workflow for every task. No exceptions.

### The 5-Step Task Flow

For **every single task** in `/docs/PROGRESS_TRACKER.md`:

```
Step 1: Mark Task In Progress
├─ Edit PROGRESS_TRACKER.md
├─ Change [ ] to 🔄 for current task
└─ Use TodoWrite tool to track the 5 steps

Step 2: Do The Work
├─ Complete the actual task requirements
├─ Follow CLAUDE.md patterns and conventions
└─ Keep it simple (KISS principle)

Step 3: Run Type Checking (if code changed)
├─ Run: npx nuxt typecheck
├─ Fix any type errors immediately
└─ Do NOT skip this step

Step 4: Update Progress Tracker
├─ Edit PROGRESS_TRACKER.md
├─ Change 🔄 to [x] ✅ for completed task
├─ Update "Quick Stats" table (tasks completed, hours logged)
├─ Update phase progress percentage
└─ Add notes/learnings in Daily Log section

Step 5: Git Commit (MANDATORY)
├─ Stage ONLY files related to current task (git add <specific-files>)
├─ NEVER use "git add ." - always stage specific files
├─ Commit with conventional format
├─ Push if appropriate
└─ See commit format below
```

### Conventional Commit Format

Use this format for ALL commits:

```bash
<type>: <description> (Task X.Y)

[optional body with details]
```

**CRITICAL**:
- ❌ **NEVER mention Claude, AI, or automated generation** in commit messages
- ❌ **NEVER add footers like "Generated with Claude Code" or "Co-Authored-By: Claude"**
- ✅ Write commits as if you're the developer who wrote the code

**Types:**
- `feat:` - New feature (Tasks 1.5, 2.1, 3.1, etc.)
- `fix:` - Bug fix
- `refactor:` - Code refactoring (no functionality change)
- `docs:` - Documentation only
- `test:` - Adding/updating tests
- `chore:` - Build process, dependencies, config

**Examples:**
```bash
# Simple commit
git commit -m "feat: generate discussion layer (Task 1.5)"

# With details
git commit -m "feat: implement Figma adapter (Task 3.2)

- Parse Figma email webhooks
- Extract comment threads
- Handle @mentions
- Support reply chains"

# Documentation update
git commit -m "docs: update PROGRESS_TRACKER with Task 1.5 completion"

# Multiple tasks bundled (avoid if possible)
git commit -m "feat: complete Phase 1 foundation (Tasks 1.5-1.6)

Generated collections and ran migrations"
```

### Using TodoWrite During Tasks

**ALWAYS use TodoWrite** to track the 5-step flow with BOTH content and activeForm:

```typescript
TodoWrite({
  todos: [
    {
      content: "Mark Task X.Y in progress in PROGRESS_TRACKER.md",
      activeForm: "Marking Task X.Y in progress",
      status: "in_progress"
    },
    {
      content: "Complete Task X.Y work",
      activeForm: "Completing Task X.Y work",
      status: "pending"
    },
    {
      content: "Run npx nuxt typecheck",
      activeForm: "Running typecheck",
      status: "pending"
    },
    {
      content: "Update PROGRESS_TRACKER.md with completion",
      activeForm: "Updating progress tracker",
      status: "pending"
    },
    {
      content: "Commit changes with conventional format",
      activeForm: "Committing changes",
      status: "pending"
    }
  ]
})
```

#### Critical Rules

- **content**: Imperative mood/command form (e.g., "Fix bug", "Run tests")
- **activeForm**: Present continuous tense (e.g., "Fixing bug", "Running tests")
- **EXACTLY ONE task** must be `in_progress` at any time (not more, not less)
- Mark tasks completed **immediately** after finishing (don't batch)
- **ONLY mark completed** when fully done (no errors, no blockers)

Mark each step complete as you go.

#### Grammar Rules for content vs activeForm

**content field** - Use **imperative mood** (commands/instructions):
```typescript
// ✅ CORRECT - Imperative mood (command form)
"Fix authentication bug"
"Run type checking"
"Update progress tracker"
"Create user component"
"Refactor error handling"

// ❌ WRONG - Not imperative
"Fixing authentication bug"  // Present continuous
"Running tests"             // Present continuous
"The bug fix"               // Noun phrase
"I will fix the bug"        // Future tense
```

**activeForm field** - Use **present continuous tense** (currently happening):
```typescript
// ✅ CORRECT - Present continuous (action in progress)
"Fixing authentication bug"
"Running type checking"
"Updating progress tracker"
"Creating user component"
"Refactoring error handling"

// ❌ WRONG - Not present continuous
"Fix authentication bug"    // Imperative
"Run tests"                 // Imperative
"Fixed the bug"            // Past tense
"Will fix the bug"         // Future tense
```

**Quick pattern**: If `content` = "Do X", then `activeForm` = "Doing X"

#### Best Practices

1. **Be Specific and Actionable**
   ```typescript
   // ✅ GOOD - Specific and clear
   {
     content: "Fix null pointer error in UserService.ts:42",
     activeForm: "Fixing null pointer error in UserService.ts:42",
     status: "in_progress"
   }

   // ❌ BAD - Too vague
   {
     content: "Fix bugs",
     activeForm: "Fixing bugs",
     status: "in_progress"
   }
   ```

2. **Break Down Complex Tasks**
   ```typescript
   // ✅ GOOD - Broken into steps
   [
     { content: "Create user schema", activeForm: "Creating user schema", status: "completed" },
     { content: "Generate migration files", activeForm: "Generating migration files", status: "in_progress" },
     { content: "Run migrations", activeForm: "Running migrations", status: "pending" },
     { content: "Test user CRUD operations", activeForm: "Testing user CRUD operations", status: "pending" }
   ]

   // ❌ BAD - Single monolithic task
   [
     { content: "Set up entire user system", activeForm: "Setting up entire user system", status: "in_progress" }
   ]
   ```

3. **Include Context When Needed**
   ```typescript
   // ✅ GOOD - Context included
   {
     content: "Run typecheck after component changes",
     activeForm: "Running typecheck after component changes",
     status: "pending"
   }

   // ⚠️ ACCEPTABLE - Minimal but clear
   {
     content: "Run typecheck",
     activeForm: "Running typecheck",
     status: "pending"
   }
   ```

4. **One Task In Progress at a Time**
   ```typescript
   // ✅ GOOD - Only one in_progress
   [
     { content: "Read API docs", activeForm: "Reading API docs", status: "completed" },
     { content: "Implement API endpoint", activeForm: "Implementing API endpoint", status: "in_progress" },
     { content: "Write tests", activeForm: "Writing tests", status: "pending" }
   ]

   // ❌ BAD - Multiple in_progress
   [
     { content: "Implement API endpoint", activeForm: "Implementing API endpoint", status: "in_progress" },
     { content: "Write tests", activeForm: "Writing tests", status: "in_progress" }  // ❌ Two at once!
   ]
   ```

5. **Update Immediately After Completion**
   ```typescript
   // ✅ GOOD - Mark complete right away
   // Step 1: Start task
   TodoWrite({ todos: [{ content: "Fix bug", activeForm: "Fixing bug", status: "in_progress" }] })
   // Step 2: Do the work...
   // Step 3: Mark complete IMMEDIATELY
   TodoWrite({ todos: [{ content: "Fix bug", activeForm: "Fixing bug", status: "completed" }] })

   // ❌ BAD - Batching completions
   // Finish 3 tasks, then mark all complete at once
   ```

#### Common Mistakes and Fixes

| ❌ Mistake | ✅ Fix | Explanation |
|-----------|--------|-------------|
| `content: "Fixing bug"` | `content: "Fix bug"` | content must be imperative, not continuous |
| `activeForm: "Fix bug"` | `activeForm: "Fixing bug"` | activeForm must be continuous, not imperative |
| `content: "The bug is fixed"` | `content: "Fix bug"` | Use imperative mood, not declarative |
| `content: "I will update docs"` | `content: "Update docs"` | No pronouns or future tense in imperative |
| Multiple `in_progress` | Only one `in_progress` | Exactly one task must be in progress |
| Not marking completed | Mark immediately | Don't batch completions |
| `status: "done"` | `status: "completed"` | Use exact status values |
| Vague: "Do work" | "Implement user auth" | Be specific and actionable |
| Missing activeForm | Include both fields | Both content and activeForm are required |
| `activeForm: "Running the tests"` | `activeForm: "Running tests"` | Avoid unnecessary articles (the, a, an) |

#### When to Mark as Completed

Mark a task as `completed` ONLY when:
- ✅ All work is finished with no errors
- ✅ Type checking passes (if applicable)
- ✅ Tests pass (if applicable)
- ✅ No blockers or dependencies remain
- ✅ The output meets the requirements

Do NOT mark as `completed` if:
- ❌ Tests are failing
- ❌ Type errors exist
- ❌ Implementation is partial
- ❌ You encountered unresolved errors
- ❌ You're blocked waiting for something
- ❌ You need to revisit it later

If blocked, keep status as `in_progress` and create a new task for the blocker:
```typescript
[
  {
    content: "Implement user authentication",
    activeForm: "Implementing user authentication",
    status: "in_progress"  // Keep this in progress
  },
  {
    content: "Resolve missing auth library dependency",
    activeForm: "Resolving missing auth library dependency",
    status: "pending"  // New task for blocker
  }
]
```

#### Real-World Examples

**Example 1: Simple Bug Fix**
```typescript
TodoWrite({
  todos: [
    {
      content: "Identify cause of null pointer error",
      activeForm: "Identifying cause of null pointer error",
      status: "completed"
    },
    {
      content: "Add null check in UserService.getUser()",
      activeForm: "Adding null check in UserService.getUser()",
      status: "in_progress"
    },
    {
      content: "Run unit tests for UserService",
      activeForm: "Running unit tests for UserService",
      status: "pending"
    },
    {
      content: "Verify fix in browser",
      activeForm: "Verifying fix in browser",
      status: "pending"
    }
  ]
})
```

**Example 2: Feature Implementation**
```typescript
TodoWrite({
  todos: [
    {
      content: "Review Nuxt UI Modal documentation",
      activeForm: "Reviewing Nuxt UI Modal documentation",
      status: "completed"
    },
    {
      content: "Create CreateUserModal.vue component",
      activeForm: "Creating CreateUserModal.vue component",
      status: "completed"
    },
    {
      content: "Implement form validation logic",
      activeForm: "Implementing form validation logic",
      status: "in_progress"
    },
    {
      content: "Add API integration for user creation",
      activeForm: "Adding API integration for user creation",
      status: "pending"
    },
    {
      content: "Run typecheck on new component",
      activeForm: "Running typecheck on new component",
      status: "pending"
    },
    {
      content: "Test modal in browser",
      activeForm: "Testing modal in browser",
      status: "pending"
    }
  ]
})
```

**Example 3: Multi-Step Task with Dependencies**
```typescript
TodoWrite({
  todos: [
    {
      content: "Install Vitest dependency",
      activeForm: "Installing Vitest dependency",
      status: "completed"
    },
    {
      content: "Configure Vitest in nuxt.config.ts",
      activeForm: "Configuring Vitest in nuxt.config.ts",
      status: "completed"
    },
    {
      content: "Create test file for useAuth composable",
      activeForm: "Creating test file for useAuth composable",
      status: "in_progress"
    },
    {
      content: "Write unit tests for login flow",
      activeForm: "Writing unit tests for login flow",
      status: "pending"
    },
    {
      content: "Write unit tests for logout flow",
      activeForm: "Writing unit tests for logout flow",
      status: "pending"
    },
    {
      content: "Run test suite and verify coverage",
      activeForm: "Running test suite and verifying coverage",
      status: "pending"
    }
  ]
})
```

### Progress Tracker Updates

When updating `/docs/PROGRESS_TRACKER.md`:

1. **Task Status**: Change `[ ]` → `🔄` → `[x] ✅`
2. **Quick Stats Table**:
   ```markdown
   | Tasks Completed | 5 / 34 |  ← Increment
   | Hours Logged | 3.75 / 112 |  ← Add task hours
   ```
3. **Phase Progress**:
   ```markdown
   **Progress**: 5/6 tasks (83%)  ← Update percentage
   **Time**: 3.75h / 6h estimated  ← Update hours
   ```
4. **Daily Log**: Add entry with what was completed

### Example Complete Task Execution

**Task 1.5: Generate Collections**

```bash
# Step 1: Mark in progress
# (Edit PROGRESS_TRACKER.md, use TodoWrite)

# Step 2: Do the work
pnpm crouton generate

# Step 3: Typecheck
npx nuxt typecheck

# Step 4: Update tracker
# (Edit PROGRESS_TRACKER.md - mark complete, update stats)

# Step 5: Commit (stage only task-related files)
git add layers/discussion/ docs/PROGRESS_TRACKER.md
git commit -m "feat: generate discussion layer (Task 1.5)

Generated ~100 files for 4 collections:
- discussions (with embedded threadData)
- sourceConfigs
- syncJobs
- tasks

All files generated in layers/discussion/"

git push
```

### Multi-Agent Continuity

**When a new agent takes over:**

1. **ALWAYS read** `/docs/PROGRESS_TRACKER.md` first
2. Check which tasks are complete vs in progress
3. Read the Daily Log for context
4. Continue from the next pending task
5. Follow the same 5-step workflow

**When resuming work:**

1. Check git status to see what's uncommitted
2. If work is half-done, decide:
   - Complete and commit it, OR
   - Revert and restart from clean state
3. Update PROGRESS_TRACKER.md accordingly

### Critical Reminders

- ✅ **NEVER skip the commit step** - Every task = One commit
- ✅ **ALWAYS run typecheck** after code changes
- ✅ **ALWAYS update PROGRESS_TRACKER.md** before committing
- ✅ **ALWAYS use TodoWrite** to track the 5 steps
- ✅ **ALWAYS read PROGRESS_TRACKER.md** when starting
- ✅ **ONLY stage task-related files** - Use `git add <specific-files>`, never `git add .`
- ❌ **NEVER batch multiple tasks** in one commit (unless explicitly told)
- ❌ **NEVER commit without updating tracker** first
- ❌ **NEVER use `git add .`** - always specify exact files changed for the task

### Why This Workflow?

1. **Traceability**: Every task has a commit with clear history
2. **Resumability**: Any agent can pick up where another left off
3. **Accountability**: Progress tracker always reflects reality
4. **Quality**: Type checking catches errors early
5. **Communication**: Clear commit messages document decisions

### Context Awareness & Session Reporting

**IMPORTANT**: Agents must report session context at the end of each task to help users make informed decisions about context management.

#### Session Info Template

At the end of EVERY task, agents MUST report session context using this template:

```markdown
## 📊 Session Context Report

**Task Completed**: [Task X.Y - Description]
**Commit**: [commit hash or "committed"]
**Progress Tracker**: Updated ✅

### Context Status
- **Token Usage**: [current]/[max] ([percentage]% used)
- **Files Read**: [count] ([list key files])
- **Files Modified**: [count] ([list files])
- **Tools Invoked**: [count] ([list most-used tools])
- **Session Duration**: [estimate based on conversation length]

### Context Quality
- **Relevant Context**: [High/Medium/Low] - [brief explanation]
- **Context Bloat**: [None/Minimal/Moderate/High] - [brief explanation]
- **Accumulated State**: [list any state that might affect future tasks]

### Recommendation
- ✅ **Safe to continue** - Context is clean and relevant
- ⚠️ **Consider clearing** - [reason: token bloat/mixed contexts/etc.]
- 🔴 **Recommend clearing** - [reason: high token usage/confusing state/etc.]

[Provide reasoning for recommendation]
```

#### When Context Clearing HELPS

**✅ Clear context when:**

1. **High token usage** (>70% budget used)
   - Prevents hitting token limits mid-task
   - Ensures fresh context for complex tasks
   - Example: After large refactoring tasks

2. **Context contamination** (mixed or conflicting information)
   - Multiple unrelated features discussed
   - Experimental code that was abandoned
   - Wrong approaches tried before correct solution
   - Example: After debugging session with many failed attempts

3. **Testing workflow documentation**
   - Validating that PROGRESS_TRACKER.md is complete
   - Ensuring new agents can pick up tasks
   - Simulating multi-agent handoffs
   - Example: End of each task in a workflow optimization project

4. **Natural task boundaries**
   - Completed a major feature or phase
   - Switching to different domain/layer
   - Moving from implementation to testing
   - Example: After completing Phase 1, before starting Phase 2

5. **Agent specialization changes**
   - Switching from code generation to review
   - Moving from backend to frontend work
   - Handoff from architect to implementer
   - Example: After design phase, before implementation

**Context clearing in these scenarios:**
- Reduces cognitive load for next agent
- Prevents stale information from influencing decisions
- Ensures documentation is the single source of truth
- Improves response quality by focusing on current task

#### When Context Clearing HURTS

**❌ DON'T clear context when:**

1. **Low token usage** (<30% budget used)
   - Plenty of room for more work
   - Clearing adds unnecessary friction
   - Current context is still valuable

2. **Tightly coupled tasks**
   - Next task directly depends on current implementation
   - Need to reference just-written code
   - Sequential bug fixes in same area
   - Example: Write component → immediately write tests for that component

3. **Active debugging session**
   - In the middle of investigating an issue
   - Need to maintain understanding of problem
   - Multiple hypotheses being tested
   - Example: Tracking down a complex race condition

4. **Rich accumulated context is valuable**
   - Discovered important patterns/insights
   - Built mental model of complex system
   - Learned about edge cases and gotchas
   - Example: Deep dive into authentication flow

5. **Rapid iteration on single feature**
   - Making quick adjustments
   - Responding to immediate feedback
   - Tweaking design/implementation
   - Example: Refining UI component based on design feedback

**Preserving context in these scenarios:**
- Maintains momentum and efficiency
- Leverages accumulated understanding
- Avoids re-reading same files repeatedly
- Reduces time to complete related tasks

#### User Control & Decision Making

**CRITICAL**: The user ALWAYS has final control over context clearing.

**Agent responsibilities:**
1. **Report** context status honestly and accurately
2. **Recommend** based on objective criteria (tokens, coherence, task boundaries)
3. **Respect** user's decision to continue or clear
4. **NEVER** automatically clear context
5. **NEVER** insist on clearing if user wants to continue

**Example Agent Report:**

```markdown
## 📊 Session Context Report

**Task Completed**: Task 1.3 - Add auto-fix to code-smell-detector
**Commit**: ef3a891
**Progress Tracker**: Updated ✅

### Context Status
- **Token Usage**: 45,231/200,000 (22.6% used)
- **Files Read**: 12 (code-smell-detector.md, TASK_TRACKER.md, examples/*.ts)
- **Files Modified**: 2 (code-smell-detector.md, TASK_TRACKER.md)
- **Tools Invoked**: 18 (Read: 8, Edit: 4, Grep: 3, Bash: 3)
- **Session Duration**: ~15 minutes

### Context Quality
- **Relevant Context**: Medium - Focused on code-smell-detector agent, some exploration of related patterns
- **Context Bloat**: Minimal - All context relates to current task or supporting research
- **Accumulated State**: Understanding of agent prompt structure, auto-fix patterns, bash script safety patterns

### Recommendation
✅ **Safe to continue** - Token usage is low, context is coherent and relevant. Next task (1.4 - git commit templates) benefits from understanding of agent prompt structure established in this session.

However, if you want to test the workflow handoff process, this is a good natural breakpoint.
```

**User options after seeing report:**
```bash
# Option 1: Continue with context (recommended by agent)
continue with Task 1.4

# Option 2: Clear despite recommendation (user's choice)
/clear

# Option 3: Ask for more details
explain why continuing is safe here
```

#### Context Clearing Workflow

When context clearing is recommended/chosen:

**Agent responsibilities:**
1. Complete all 5 workflow steps
2. Provide Session Context Report (above)
3. Announce: **"✅ Task X.Y complete. Ready for context clear."**
4. Say the code word (found at the top of CLAUDE.md)
5. **End with handoff information:**
   - State the progress tracker location (e.g., "Progress tracked in: `/docs/PROGRESS_TRACKER.md`")
   - Provide a concise, actionable prompt (1-2 sentences) for the next agent
   - Format: "Progress tracked in: `[path]` | continue with: [prompt]"
6. STOP and wait for user action
7. Do NOT continue to next task automatically

**Code word verification**: At the end of EVERY task completion, the agent MUST say the code word stated at the top of this file. This proves the agent has read CLAUDE.md and is following instructions.

**User action:**
```bash
# After agent announces completion and provides report
/clear

# Then in fresh session
continue with next task
```

**Fresh agent startup (after /clear):**
1. Read CLAUDE.md (automatic via claudeMd system)
2. Read `/docs/PROGRESS_TRACKER.md` FIRST
3. Check last completed task
4. Continue with next pending task
5. Follow the 5-step workflow

**Benefits of context clearing:**
- ✅ Tests that documentation is complete and clear
- ✅ Simulates multi-agent handoffs
- ✅ Ensures PROGRESS_TRACKER.md is the source of truth
- ✅ Catches missing documentation or unclear instructions
- ✅ Prevents context accumulation and token bloat

**Example flow:**
```
Agent: Completes Task 1.5, commits
Agent: [Provides Session Context Report]
Agent: "✅ Task 1.5 complete. Ready for context clear."
Agent: "Yesterday" (code word)
Agent: "Progress tracked in: `/docs/PROGRESS_TRACKER.md` | continue with: Task 1.6 - run migrations for the discussion layer."
User: /clear
User: "Progress tracked in: `/docs/PROGRESS_TRACKER.md` | continue with: Task 1.6 - run migrations for the discussion layer."
New Agent: Reads PROGRESS_TRACKER.md
New Agent: "I see Task 1.5 is complete. Starting Task 1.6 - running migrations..."
```

## Technology Stack

- **Framework**: Nuxt (latest version) - [Documentation](https://nuxt.com/docs)
- **Vue Syntax**: Composition API with `<script setup>` (MANDATORY - never use Options API)
- **UI Library**: Nuxt UI 4 (CRITICAL: Only v4, never v2/v3)
  - Common v4 changes: USeparator (not UDivider), USwitch (not UToggle), UDropdownMenu (not UDropdown), UToast (not UNotification)
- **Utilities**: VueUse (ALWAYS check VueUse first before implementing complex logic)
- **Hosting**: NuxtHub (Cloudflare edge)
- **Package Manager**: pnpm (ALWAYS use pnpm)
- **Architecture**: Domain-Driven Design with Nuxt Layers
- **Testing**: Vitest + Playwright

## Model Selection Guidelines

This project uses multiple Claude models strategically based on task complexity:

### Opus (Deep Reasoning)
Use for tasks requiring complex multi-step reasoning:
- Architecture and design decisions (system-architect)
- Complex multi-file refactoring
- Security-sensitive code review (code-reviewer-proactive)
- API design with trade-offs (api-designer)
- Domain modeling
- Code smell detection with architectural analysis (code-smell-detector)
- UI component creation with complex patterns (ui-builder, nuxt-ui-component)

**Agents on Opus**: system-architect, code-reviewer-proactive, api-designer, ui-builder, nuxt-ui-component, code-smell-detector

### Sonnet (Balanced Speed & Quality)
Use for tasks needing quality with reasonable iteration speed:
- Test creation and debugging (test-engineer)
- TypeScript error fixing (typecheck-specialist)
- Git operations and commits (git-specialist)
- Translation management (translations-specialist)
- Schema generation (nuxt-crouton)
- Parallel coordination (state-manager)

**Agents on Sonnet**: test-engineer, typecheck-specialist, git-specialist, state-manager, translations-specialist, nuxt-crouton

### Haiku (Fast)
Use for simple, mechanical tasks:
- Template/file search (template-scout)
- Simple lookups and queries
- Status checks
- Basic transformations

**Agents on Haiku**: template-scout

### When to Override

You can request a specific model when invoking an agent:
- Use `model: opus` for complex, high-stakes decisions even from a Sonnet agent
- Use `model: haiku` for quick queries within an Opus agent

## MANDATORY: TypeScript Checking
**EVERY agent and Claude Code MUST run `npx nuxt typecheck` after making changes**
- Run after creating/modifying Vue components
- Run after changing TypeScript files
- Run before considering any task complete
- If typecheck fails, FIX the errors immediately
- Never use `pnpm typecheck` - ALWAYS use `npx nuxt typecheck`

## Core Principles

### 1. Simplicity Over Complexity (KISS)
- Start simple, add complexity only when proven necessary
- One domain = one layer (only if it helps)
- Avoid premature optimization
- **ALWAYS check VueUse composables first** before writing custom utilities
- Use built-in Nuxt features and composables
- Check Nuxt UI templates before building from scratch

### 2. Composables First, Readable Code Always
```typescript
// BEST: Use composables for reusable logic
const { users, loading, refresh } = useUsers()
const { filteredUsers } = useFilteredUsers(users)

// GOOD: Clear and readable inline logic
const activeUsers = users.filter(u => u.active)
const userNames = activeUsers.map(u => u.name)

// ALSO GOOD: When it's clearer
const results = []
for (const user of users) {
  if (user.active && user.verified) {
    results.push(processUser(user))
  }
}

// BAD: Over-engineered FP
const result = users
  .filter(compose(prop('active'), prop('verified')))
  .map(pipe(processUser, transform, validate))

// Keep it simple - prefer composables > readability > functional purity
```

### 3. Robust Error Handling
```typescript
// Always wrap async operations
try {
  const data = await $fetch('/api/endpoint')
  return { data, error: null }
} catch (error) {
  console.error('Operation failed:', error)
  return { data: null, error }
}
```

### 4. Frontend Excellence (Claude 4 Pattern)
When generating UI:
- **"Don't hold back. Give it your all."**
- Include hover states, transitions, micro-interactions
- Create impressive demonstrations of capabilities
- Apply design principles: hierarchy, contrast, balance
- Make it feel alive and responsive

### 5. General Solutions (Not Test-Specific)
```
Please write a high quality, general purpose solution.
Implement a solution that works correctly for all valid inputs,
not just the test cases.
```

## Nuxt Layers Architecture

```
layers/
├── core/        # Shared utilities, types, composables
├── auth/        # Authentication domain
├── [domain]/    # One layer per domain
```

Each layer is isolated with its own:
- nuxt.config.ts
- composables/
- components/
- server/api/
- types/

## CRITICAL: Nuxt UI 4 Component Patterns

### ⚠️ Component Name Changes (v3 → v4)
**YOU MUST USE THE V4 NAMES:**
- ❌ `UDropdown` → ✅ `UDropdownMenu`
- ❌ `UDivider` → ✅ `USeparator`
- ❌ `UToggle` → ✅ `USwitch`
- ❌ `UNotification` → ✅ `UToast`

### ⚠️ ALWAYS Check MCP Docs First

**MANDATORY**: Before using ANY Nuxt UI component:
```bash
# Use the Nuxt UI MCP server to get correct v4 patterns
mcp__nuxt-ui__get_component("UModal")
mcp__nuxt-ui__get_component("USlideover")
# etc.
```

### Vue Component Structure (MANDATORY)

```vue
<script setup lang="ts">
// ALWAYS use Composition API with <script setup lang="ts">

interface Props {
  teamId: string
  flow?: Partial<Flow>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  success: [flowId: string]
  cancel: []
}>()

const isOpen = ref(false)
const loading = ref(false)

// Composables
const toast = useToast()
const { data } = await useFetch('/api/endpoint')

// Methods
const handleSave = async () => {
  try {
    // Logic
    toast.add({ title: 'Success', color: 'success' })
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message, color: 'error' })
  }
}
</script>

<template>
  <!-- Template -->
</template>
```

### For Detailed Nuxt UI v4 Patterns

**See**: `.claude/agents/nuxt-ui-component.md`

This skill covers:
- ✅ Correct v4 patterns for all overlays (Modal, Slideover, Drawer)
- ✅ Form components (UForm, USelect, USwitch)
- ✅ Common v3→v4 mistakes and how to avoid them
- ✅ Automatic typecheck workflow
- ✅ VueUse integration

**Key differences to remember:**
- Overlays use `v-model:open` (not `v-model`)
- Form inputs use `v-model`
- USelect uses `:items` (not `:options`)
- Trigger button goes INSIDE UModal/USlideover/UDrawer
- Check MCP docs before writing any component

## Testing Strategy

### Authentication Testing Setup
```typescript
// Mock auth for unit tests
vi.mock('~/composables/useAuth', () => ({
  useAuth: () => ({
    user: ref({ id: '1', email: 'test@example.com' }),
    isAuthenticated: ref(true)
  })
}))

// Playwright with auth
test.use({
  storageState: 'tests/.auth/user.json'
})
```

### Test Coverage Goals
- Unit: 80%+ for utilities/composables
- Integration: Critical API paths
- E2E: User journeys with Playwright

## Git Workflow (Solo Dev)

### Commit Messages (Conventional Commits)
```
feat: add user authentication
fix: resolve navigation bug
docs: update API documentation
refactor: simplify auth flow
test: add login e2e tests
chore: update dependencies
```

### Branch Strategy
```
main          # Production
feature/*     # New features
fix/*         # Bug fixes
experiment/*  # Explorations
```

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (runs: nuxt dev)
pnpm build            # Production build (runs: nuxt build)
pnpm preview          # Preview build (runs: nuxt preview)

# Nuxt-Specific Commands (use npx nuxt [command])
npx nuxt dev          # Start development server
npx nuxt build        # Build for production
npx nuxt preview      # Preview production build
npx nuxt generate     # Generate static site
npx nuxt analyze      # Analyze bundle size
npx nuxt info         # Display project info
npx nuxt prepare      # Prepare project types
npx nuxt typecheck    # TypeScript checking (IMPORTANT: NOT 'pnpm typecheck'!)
npx nuxt cleanup      # Remove cache and temp files
npx nuxt upgrade      # Upgrade Nuxt and dependencies
npx nuxt add [module] # Add Nuxt modules

# Testing
pnpm test            # All tests
pnpm test:unit       # Unit only
pnpm test:e2e        # Playwright E2E

# Code Quality
pnpm lint            # ESLint
pnpm lint:fix        # Auto-fix
npx nuxt typecheck   # TypeScript (ALWAYS use this, never 'pnpm typecheck')

# NuxtHub
nuxthub deploy       # Deploy to edge
nuxthub dev          # Local with bindings
```

## State Management (No Pinia)

```typescript
// Use Nuxt's built-in state
export const useAppState = () => {
  return useState('app', () => ({
    user: null,
    settings: {}
  }))
}

// Server state with proper handling
const { data, pending, error, refresh } = await useFetch('/api/data')
```

## Performance Optimization

- Lazy load components: `<LazyComponent />`
- Use `v-memo` for expensive lists
- Implement loading skeletons
- Cache API responses appropriately
- Leverage edge caching on NuxtHub

## Sub-Agent Usage

When delegating to sub-agents:
1. **Template scout first** - Check existing solutions
2. **Parallel by default** - Run independent tasks simultaneously
3. **Clear boundaries** - Each agent gets one specific task
4. **Track activities** - Document decisions and outputs
5. **Smell check after** - Run code quality review

Example workflow:
```
@template-scout find dashboard examples
@nuxt-ui-builder adapt dashboard from template
@api-designer design metrics endpoint
@test-mock-specialist setup auth mocks
@code-smell-detector review implementation
/track feature "dashboard"
```

## Common Patterns

### API Error Handling
```typescript
export default defineEventHandler(async (event) => {
  try {
    // Validate input
    const body = await readValidatedBody(event, schema.parse)

    // Check auth
    const user = await requireAuth(event)

    // Business logic
    const result = await processRequest(body)

    return { success: true, data: result }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message
    })
  }
})
```

### Component Testing
```typescript
describe('Component', () => {
  it('handles user interaction', async () => {
    const wrapper = mount(Component)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('action')).toBeTruthy()
  })
})
```

## CI/CD Recommendations

Start simple with GitHub Actions:
```yaml
name: Test & Deploy
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: nuxthub deploy
```

## Documentation Organization

### Agent Output Structure
When agents create documentation, briefings, or reports, they MUST follow this structure:

```
docs/
├── briefings/           # Task briefings and initial analyses
│   └── [feature-name]-brief.md
├── reports/            # Analysis reports and findings
│   └── [analysis-type]-report.md
├── guides/             # How-to guides and best practices
│   └── [topic]-guide.md
├── setup/              # Setup and configuration docs
│   └── [component]-setup.md
└── architecture/       # Architecture decisions and designs
    └── [domain]-architecture.md
```

### Agent Documentation Rules
1. **Briefings** → `docs/briefings/[feature-name]-brief.md`
2. **Audit Reports** → `docs/reports/[audit-type]-report.md`
3. **Technical Guides** → `docs/guides/[topic]-guide.md`
4. **Architecture Docs** → `docs/architecture/[domain]-architecture.md`
5. **Setup Instructions** → `docs/setup/[component]-setup.md`

### File Naming Convention
- Use kebab-case for all documentation files
- Include timestamp suffix for reports: `[name]-report-YYYYMMDD.md`
- Be descriptive but concise: `translation-audit-report.md` not `report.md`

### External Documentation Updates
**MANDATORY: After making changes to the codebase, ALWAYS update the external documentation.**

Documentation location: `../docs` (relative to project root)

When you make changes to:
- Components → Update component documentation
- APIs → Update API reference docs
- Features → Update feature guides
- Configuration → Update setup/configuration docs

This ensures the public-facing documentation stays in sync with the codebase.

## Key Reminders

1. **Check Nuxt MCP first** - Always, no exceptions
2. **Run `npx nuxt typecheck`** - After EVERY change, no exceptions
3. **Use Composition API** - ALWAYS use `<script setup lang="ts">`, never Options API
4. **Parallel when possible** - Don't sequence independent tasks
5. **One domain = one layer** - Keep isolation
6. **Test as you code** - Not after
7. **Keep it simple** - You're working solo
8. **Make it impressive** - UI should feel alive
9. **General solutions** - Not test-specific hacks
10. **Document in correct folder** - Follow docs/ structure above
11. **End with next prompt** - After completing each task, provide a short, actionable prompt for the next agent to use

---

*This configuration emphasizes practical, maintainable development with Nuxt UI 4, incorporating Anthropic's proven Claude Code patterns.*
