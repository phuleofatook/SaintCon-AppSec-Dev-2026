# Ape Input — Story Mode Integration Specification

SAINTCON 2026 · Spaceways: Flight 26 · Navigator / Developer Track

## Objective

Update the existing application's Story Mode progression to match the revised narrative. **Reuse the current application architecture, exercise definitions, feedback UI, and navigation wherever possible.** Do not rebuild the app or introduce live AI services.

The experience should be self-guided. Cutscenes provide narrative context and tell participants what comes next; exercises provide hands-on review practice; existing feedback screens explain reference decisions without grading participants.

**Core message:** The challenge isn't just finding problems. It is making responsible decisions about increasingly large amounts of code. AI helps with analysis; the human reviewer owns the ship/no-ship decision.

## Required story order

| Order | Screen / node | Type | Destination / purpose |
|---|---|---|---|
| 0 | Title | Existing entry screen | Choose Story Mode or Freelance Mode |
| 1 | New Assignment | Cutscene 1 | Dave's airlock incident; participant inherits code-review responsibility. Illustrated **BEGIN SHIFT** goes to language selection |
| 2 | Language Selection | Existing functional screen | Choose TypeScript, Java, or Python for this run; then go to Cutscene 2 |
| 3 | Meet Your AI Reviewer | Cutscene 2 | AI analyzes and advises; human decides. Illustrated **START REVIEW** goes to tutorial 1 |
| 4 | Straightforward Approval | Tutorial exercise 1 | Simple acceptable change; existing decision and feedback flow |
| 5 | Straightforward Rejection | Tutorial exercise 2 | Simple logic/functional problem; existing decision and feedback flow |
| 6 | Throughput Crisis | Cutscene 3 | Monkey/AI code generation overwhelms review queue; **NEXT REVIEW** |
| 7 | Routine Review Under Pressure | Optional intermediate exercise | An ordinary-sized substantive PR; may be omitted without breaking story |
| 8 | Massive Refactor Introduction | Cutscene 4 | Mostly mechanical changes, meaningful behavior hidden in noise; **OPEN REVIEW** |
| 9 | Large Refactor | Main exercise | Large DTO migration with a consequential request-boundary behavior change; reference recommendation Deny |
| 10 | Judgment Call Introduction | Cutscene 5 | A smaller PR improves code but leaves an existing issue; **REVIEW PR** |
| 11 | Judgment Call | Main exercise | Functional fix leaves pre-existing SQL injection unchanged; reference recommendation Approve with qualifications |
| 12 | Final Decision / Ownership | Final cutscene | Reinforce human responsibility; return to menu or offer Freelance Mode through existing navigation |

**Important:** Node 7 is optional. If no suitable intermediate exercise is configured, transition directly from Cutscene 3 to Cutscene 4. Do not leave a blank placeholder or broken navigation link. Do not assume exact exercise IDs or image filenames from this specification; discover and map existing assets/IDs in the repository.

## Narrative intent by cutscene

- **Cutscene 1 — New Assignment:** Introduces reviewer role and Dave's cartoonishly absurd airlock fate. It does **not** introduce the AI assistant in detail. Ends at language selection.
- **Cutscene 2 — Meet Your AI Reviewer:** Immediately after language selection and **before any tutorial**. Establishes AI as a useful reviewer/hint provider, not the approval authority.
- **Cutscene 3 — Throughput Crisis:** Escalates workload after tutorials, providing the rationale for assisted review and larger PRs.
- **Cutscene 4 — Massive Refactor:** Directly precedes the large refactor exercise. Emphasizes separating repetitive mechanical edits from changes in behavior.
- **Cutscene 5 — Judgment Call:** Directly precedes the ambiguity/risk exercise. Do not frame this as a simple “spot the SQL injection” task.
- **Final cutscene:** Reinforces the hook: **YOUR THROUGHPUT IS THROUGH THE ROOF! NOW CAN YOU TAKE OWNERSHIP OF IT?**

## AI assistant behavior

1. Introduce the AI assistant in Cutscene 2, before tutorial 1.
2. AI hints/analysis should be available in all Story Mode exercises under the same rules already used by the application. **Do not implement a mid-story unlock.**
3. Freelance Mode should retain its existing AI behavior and not depend on story progress.
4. Reuse existing precomputed hint/analysis mechanisms. No live conversational AI, developer-agent chat, API dependency, or new AI service is requested.
5. A visual AI indicator/portrait within exercise UI is a **future enhancement**, not required for this integration.

## Language selection

- In Story Mode, move the existing language selection step **between Cutscene 1 and Cutscene 2**.
- Preserve current available languages and current selection behavior.
- The language stays fixed for that run; changing it requires restarting. **Do not add a language-switching UI.**
- Keep the screen functional and plain for now; no new artwork is required.
- Do not alter Freelance Mode language selection unnecessarily.

## Exercise mapping and feedback

Map placeholders to existing exercises where possible, preserving each exercise's actual code and language variants.

1. **Tutorial Approve:** Harmless/textual/Hello World change; reference Approve.
2. **Tutorial Deny:** Simple functional or logic error; reference Deny. Reinforces that code review is not limited to security findings.
3. **Optional intermediate:** Existing substantive review scenario if it fits timing and progression. Do not invent a new exercise just to fill this slot.
4. **Large refactor:** DTO-heavy mechanical migration plus a meaningful request-boundary change; reference Deny. The learning objective is AI-assisted triage and independent investigation, not merely finding a hidden vulnerability. Preserve current implementation unless separately asked to expand the file count.
5. **Judgment call:** Functional fix leaves pre-existing SQL injection unchanged; reference Approve with qualifications. Approval is not a certification that surrounding code is secure. Reasoning should recognize that organizational policy and risk context may justify a different decision.

Keep the current decision UI and existing comparison/feedback screens. They show participant decision, reference recommendation, and reasoning, with learning rather than grading as the goal. Do not add scoring, quizzes, or new reflection steps.

## Illustrated button integration

The cutscene images may contain drawn buttons. Clickable image regions have already been proven feasible in this application.

- The illustrated action is intended to be the most visually obvious way forward, but **existing conventional navigation must remain usable as a fallback**.
- Both the image hotspot and conventional control must call the same navigation logic.
- Hotspot destinations must follow the story configuration, not hardcoded numeric indices wherever practical.
- Maintain correct hotspots at different display sizes/aspect ratios. Use image-relative coordinates or the existing responsive hotspot mechanism; avoid absolute screen pixel positions.
- Only make hotspots active where a corresponding illustrated button actually exists. New artwork may arrive incrementally.
- Do not invent additional clickable regions or assume an image contains a button without inspecting it.
- Preserve keyboard/accessibility navigation through conventional controls; provide an accessible label for image hotspots if supported.

Expected labels/destinations:

| Cutscene | Illustrated action | Next screen |
|---|---|---|
| 1 | BEGIN SHIFT | Language Selection |
| 2 | START REVIEW | Tutorial Approve |
| 3 | NEXT REVIEW | Optional intermediate exercise, otherwise Cutscene 4 |
| 4 | OPEN REVIEW | Large Refactor |
| 5 | REVIEW PR | Judgment Call |
| Final | To be determined | Existing completion/menu flow |

## Scope and priorities

**Required:** correct sequence, correct exercise mapping, early AI availability, language-selection position, complete navigation, preserved feedback, and functional fallback controls.

**Only if assets and coordinates exist:** illustrated button hotspots for each cutscene. It is acceptable to keep conventional navigation until the artwork is ready.

**Not required:** new language-screen art, AI portrait/indicator, live AI, new exercises, expanded DTO count, new scoring, or a redesigned UI theme. Styling has already been revised separately based on current artwork; avoid a broad restyle.

## Implementation instructions for Codex

1. Inspect the repository's existing Story Mode flow, route/state handling, language selection, cutscene assets, exercise IDs, hint availability, and feedback behavior.
2. Report a concise mapping from **existing** nodes/assets/exercises to the intended sequence. Flag anything missing or ambiguous rather than silently inventing it.
3. Make the smallest practical changes to implement the required progression. Prefer a declarative story-step configuration if the app already supports one.
4. Preserve Freelance Mode and the ability to restart a story. Confirm no stale story-unlock logic restricts AI hints.
5. Keep missing/new cutscene assets as clearly identified placeholders or use existing assets only where narratively accurate. Do not substitute a misleading cutscene just to fill a slot.
6. Validate that every step has a reachable next step, including the optional intermediate branch and the end-of-story path.
7. Run available tests/build checks. Report changes made, missing assets, assumptions, and any remaining manual hotspot-coordinate work.

## Acceptance checks

- Story Mode from title opens Cutscene 1 **before** language selection.
- Cutscene 1 advances to language selection; selection advances to Cutscene 2.
- Cutscene 2 appears **before** the first tutorial and introduces AI assistance.
- Tutorials appear in Approve-then-Deny order.
- Throughput Crisis appears after tutorials.
- Massive Refactor cutscene appears immediately before its exercise.
- Judgment Call cutscene appears immediately before its exercise.
- All exercises retain decision/feedback behavior; AI hints are available without a mid-story unlock.
- The optional intermediate exercise can be omitted without broken navigation.
- Illustrated buttons, when configured, lead to the same destination as conventional navigation.
- Freelance Mode continues to work independently.
- Story completion provides a clear exit or return path.

**Guiding principle:** Implement a coherent, self-guided code-review experience. Avoid scope expansion just because the story outline includes optional ideas.
