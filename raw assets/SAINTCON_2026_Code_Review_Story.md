# SAINTCON 2026 AppSec Developer Track — Code Review Story

## Working title

**APE INPUT™: The Reviewer's Shift**

### Core message

> **Use AI. Use two AIs. Use ten AIs. Use AI to review AI-generated code.**
>
> **Just don't confuse automated analysis with somebody owning the decision.**

Supporting theme:

> **Your throughput is through the roof. Now how do you take ownership of it?**

The exercise is a **complete code review** with an emphasis on security judgment. Security is the primary educational lens, but the participant is not being trained to act as a security scanner. They are being trained to look at a proposed code change, understand its implications, and decide whether they are comfortable allowing it to ship.

---

# 1. Overall experience

The application supports two modes:

- **Story Mode** — follows a narrative progression introducing code review concepts, increasing code volume, AI-assisted review, ambiguity, and human ownership.
- **Free For All** — skips the narrative and lets participants choose from the exercise pool.

The story should be short enough that the participant spends most of their time actually reviewing code. Story pages exist only when they:

1. Introduce a useful concept.
2. Change the participant's understanding of the situation.
3. Introduce a new capability.
4. Transition between meaningful exercise groups.

Humor is the delivery mechanism, not the curriculum.

The airlock, APE INPUT™, corporate-speak, and sci-fi references should make the experience memorable without obscuring the actual lesson.

---

# 2. Main page — Choose your shift

The landing page presents the existing airlock poster prominently.

Possible headline:

> ## YOUR PREDECESSOR FAILED CODE REVIEW.
> ### YOU HAVE BEEN SELECTED FOR REASSIGNMENT.

Or equivalent darkly humorous wording.

Two primary choices:

### STORY MODE

> Follow the incident from beginning to end.
>
> Learn the review process, meet your new automated coworkers, and find out what happened to the previous reviewer.

### FREE FOR ALL

> Skip the story.
>
> Pick any exercise from the queue and see how many you can review.

The modes should not imply that Free For All is "hard mode" or that Story Mode is a tutorial-only experience.

---

# 3. Story Page — Orientation

## Purpose

Establish the participant's role and define what a review decision means.

## Narrative

> # WELCOME ABOARD
>
> Congratulations, Reviewer.
>
> Your predecessor is no longer with the company.
>
> Management assures us this was unrelated to the airlock.
>
> Your assignment is simple:
>
> **Review proposed code changes and decide whether they should ship.**
>
> You are not being asked to rewrite the code.
>
> You are not being asked whether you would have designed it differently.
>
> You are not being asked whether the code is beautiful.
>
> You are being asked one question:
>
> ## **"Am I comfortable letting this ship?"**

Then explain the controls:

### APPROVE

> You believe the proposed change is acceptable from a security perspective.

### DENY

> You have identified a security reason the change should not ship as proposed.

### NOT ENOUGH INFORMATION

> You cannot make a responsible decision from the information provided.

This option should be available where appropriate rather than forcing every situation into approve/deny.

## Learning objective

Establish that the exercise is about **review judgment**, not code golf, style, architecture preferences, or generic correctness.

---

# 4. Language selection

The participant chooses their preferred programming language.

The selected language determines which version of the exercises they see.

The purpose is to remove language familiarity as a barrier. Participants should be able to review several exercises in a language they already know.

The story should not make language choice itself part of the challenge.

Possible copy:

> ## PICK YOUR LANGUAGE
>
> We have generated versions of the review queue for several languages.
>
> Pick the one you know best.
>
> **You are here to practice reviewing code, not to learn a new language.**

---

# 5. Tutorial exercises

The participant now enters the exercise UI.

The tutorial should be deliberately simple and should teach the mechanics without requiring meaningful AppSec expertise.

## Tutorial 1 — Hello World

A trivial, obviously safe change.

Expected decision:

**APPROVE**

Purpose:

- Demonstrate the review UI.
- Establish that not every change is suspicious.
- Give the participant an immediate successful interaction.

## Tutorial 2 — Obvious security problem

Avoid using a merely nonfunctional or stylistically bad change.

The tutorial should demonstrate an actual security-relevant reason to deny a change.

For example:

- User-controlled input interpolated into a SQL query.
- An obvious reflected XSS.
- A missing authorization check on a clearly protected resource.

Expected decision:

**DENY**

The tutorial can explicitly explain the reason after the decision.

## Optional Tutorial 3 — Security fix

A safe fix for the vulnerability introduced above.

Expected decision:

**APPROVE**

This reinforces an important point:

> Security review is not "reject anything security-related."
>
> Security fixes are changes you want to ship.

---

# 6. Story Page — Your Assignment / The Queue

After the tutorial, explain why the participant is going to see a larger collection of exercises.

## Narrative

> # YOUR FIRST SHIFT
>
> Engineering has sent over your first batch of changes.
>
> Don't worry.
>
> These are the easy ones.
>
> Management has assured us that the code has already undergone extensive automated analysis.
>
> Which means there is absolutely nothing to worry about.
>
> Probably.

Then introduce the underlying problem:

> Engineering has recently adopted **APE INPUT™**, our revolutionary AI-assisted software development platform.
>
> APE INPUT™ has produced unprecedented software throughput.
>
> Unfortunately, the review department has not experienced unprecedented increases in staffing.

Possible fake metrics:

| | Before APE INPUT™ | After APE INPUT™ |
|---|---:|---:|
| Changes/day | 12 | 12,000 |
| Reviewers | 1 | 1 |
| Human attention | Limited | Still limited |
| Monkeys | Classified | Millions |

Do not overdo this gag. The important concept is:

> **The factory got faster. The reviewer didn't.**

---

# 7. First real review queue

Provide a small cluster of straightforward exercises.

Potential examples:

- SQL injection
- XSS
- Hard-coded secret
- Missing authorization
- Legitimate security fix
- Safe ordinary change

The exercises should not all be vulnerabilities.

The participant should learn to distinguish:

- Safe changes.
- Security vulnerabilities.
- Security fixes.
- Changes that are security-relevant but acceptable.
- Changes where context matters.

The goal is not to make every exercise increasingly difficult.

The goal is to expose the participant to **different kinds of security judgment**.

---

# 8. Story Page — The Throughput Problem

After several reviews, interrupt the queue with a short story page.

## Narrative

> # GOOD NEWS
>
> You have completed your first batch.
>
> Unfortunately, Engineering produced another 4,000 changes while you were reviewing those five.
>
> Management has a solution.
>
> ## THEY BOUGHT ANOTHER AI.
>
> This is considered a major strategic initiative.

The participant should now understand that simply telling humans to "review faster" does not solve the problem.

## Learning objective

Introduce **review capacity as a security concern**.

The issue is not necessarily that AI-generated code is bad.

The issue is that increasing code-production throughput can increase the amount of material that must be reviewed.

---

# 9. Story Page — Meet Your New Reviewer

This is where the AI review functionality becomes available.

Do not present the AI as a "hint."

It is an actual **AI Code Review** capability.

Possible UI label:

> **APE INPUT™ CODE REVIEW**
>
> `Run automated review`

The participant may use it when they choose.

Do not force them to use it on every exercise.

## Important distinction

The AI should provide analysis, evidence, concerns, and recommendations — not simply reveal the intended answer.

Example:

> ### APE INPUT™ CODE REVIEW
>
> **Recommendation:** APPROVE  
> **Confidence:** 94%
>
> **Summary:**  
> Adds a customer lookup endpoint and corresponding DTO.
>
> **Potential concerns:**
> - Authorization behavior depends on existing middleware.
> - Database input is parameterized.
> - Error responses may expose implementation details.
>
> **Suggested areas for human review:**
> - `CustomerController.ts`
> - `customerRepository.ts`

The human still makes the final decision.

---

# 10. AI review exercise patterns

The AI functionality should support several meaningful situations.

## A. AI agrees with the participant

AI identifies a real problem and recommends denial.

Lesson:

> AI can be useful.

## B. AI finds something the participant missed

The participant can see how automated analysis can augment human review.

Lesson:

> AI can expand review capacity and identify areas worth investigating.

## C. AI gives an incomplete assessment

The AI makes a reasonable assessment based on the information available, but the participant notices an important contextual issue.

Lesson:

> AI can provide analysis without providing the complete answer.

Avoid deliberately stupid AI responses.

## D. AI flags something that is not a reason to block the change

The participant must decide whether the concern is actually significant enough to deny the change.

Lesson:

> Automated findings still require human judgment.

## E. AI says "not enough information"

The AI identifies something that depends on context outside the presented change.

Lesson:

> Good automated review can identify uncertainty instead of pretending certainty.

---

# 11. AI review should not be limited to security

The feature is called **Code Review**, not Security Review.

The AI may discuss:

- Security concerns.
- Error handling.
- Authorization.
- Data exposure.
- Input handling.
- Dependency changes.
- Behavior changes.
- Maintainability concerns.
- Areas requiring additional context.

However, the participant's scoring and educational emphasis remain focused primarily on security judgment.

The participant should experience a realistic code-review workflow rather than a vulnerability scanner disguised as an AI.

---

# 12. Story Page — The Review Strategy

Once the participant has used the AI reviewer a few times, introduce the broader question.

## Narrative

> # A STRATEGIC QUESTION
>
> Engineering is producing more code than one human can reasonably inspect.
>
> You now have automated review available.
>
> So what should the review process look like?
>
> **Humans review everything?**
>
> **AI reviews everything?**
>
> **AI reviews everything and humans investigate the interesting parts?**
>
> **Multiple independent AI reviewers, with humans handling disagreement and high-risk changes?**
>
> Management would like to select the option with the lowest licensing cost.
>
> Fortunately, management does not make security decisions.

The participant does not necessarily need to select a workflow here. This is primarily a story/teaching beat.

## Learning objective

Introduce **risk-based review and human-in-the-loop automation**.

The intended lesson is not:

> AI bad.

It is:

> Automation can be part of the review process, but somebody still needs to own the decision.

---

# 13. Large/repetitive change — The attention problem

Introduce a deliberately large change.

Example:

- 438 DTO files changed.
- Hundreds of nearly identical generated changes.
- One or a few meaningful deviations.
- One deviation has a security consequence.

The participant should not be expected to manually inspect every file line by line.

This is where AI-assisted triage becomes genuinely useful.

The AI might say:

> **438 files changed.**
>
> 431 appear structurally identical.
>
> 7 contain deviations from the common pattern.
>
> **Suggested review priority:**
>
> 1. `CustomerResponse.ts`
> 2. `AdminUserDto.ts`
> 3. `PaymentRequest.ts`
> ...

The participant investigates.

## Learning objective

Demonstrate:

> **Human attention is finite.**

AI can help reduce the search space.

This is a stronger demonstration of AI-assisted review than simply having a chatbot produce an approve/deny answer.

---

# 14. AI disagreement

Introduce at least one exercise where two automated reviews disagree.

Example:

> ### APE INPUT™ REVIEWER A
>
> **APPROVE**
>
> No obvious authorization issues detected.

And:

> ### APE INPUT™ REVIEWER B
>
> **FLAG**
>
> The endpoint appears to expose customer records without verifying ownership.

The participant has to investigate and make the final decision.

## Learning objective

The interesting question is not:

> "Which AI is smarter?"

It is:

> **"What do I do when automated analysis disagrees?"**

AI disagreement can itself become a useful signal for human investigation.

---

# 15. Gray-area exercises

The story should eventually transition from obvious vulnerabilities to genuine judgment.

Possible exercise types:

### Pre-existing vulnerability

The proposed change touches code containing a vulnerability but does not introduce it.

Question:

> Is this change a reason to block?

The answer may depend on the specific context.

### Legitimate security fix with unrelated problems

The change fixes one vulnerability but introduces a different security concern.

Question:

> Is the net result acceptable?

### Context-dependent authorization

The change looks dangerous in isolation, but existing middleware provides the necessary protection.

Question:

> Do you have enough information?

### Ambiguous security concern

The change could be dangerous depending on assumptions not established by the ticket or code shown.

Question:

> Approve, deny, or request more information?

### Dependency/supply-chain change

A small dependency update has potentially important security implications.

Question:

> What evidence is sufficient to approve it?

### Prompt injection / AI-agent authority

A proposed AI-assisted workflow contains instructions that attempt to cause an agent to perform an action beyond the authority appropriate to the task.

The lesson should be about **authority and consequences**, not simply "prompt injection is bad."

---

# 16. Important framing for all exercises

Do not treat ordinary code quality or correctness as an objective score.

The participant should not lose points because:

- They dislike the architecture.
- They would name a variable differently.
- They would refactor the implementation.
- They think the code is ugly.
- They found a non-security bug that is irrelevant to the review decision.

The core question remains:

> **Is there a security reason to stop this change from shipping?**

Where the correct professional response is uncertainty, the exercise should permit:

> **NOT ENOUGH INFORMATION**

This is part of the judgment being taught.

---

# 17. The final incident

Near the end of Story Mode, introduce the incident that explains the opening airlock poster.

Possible page:

> # INCIDENT REPORT
>
> You have been reviewing code for several hours.
>
> You have seen obvious vulnerabilities.
>
> You have seen legitimate fixes.
>
> You have seen AI find things humans missed.
>
> You have seen AI miss things humans found.
>
> You have seen reviewers disagree.
>
> You have learned that sometimes the right answer is "I need more information."
>
> There is one change left.
>
> This is the change that got your predecessor reassigned.

Then present a subtle, realistic security issue rather than an obvious "gotcha."

The participant makes the final decision.

If they identify the issue, the story resolves.

If they miss it, the result should be humorous rather than punitive.

---

# 18. Final debrief

The final page should drop most of the jokes and make the lesson explicit.

## Suggested copy

> # SHIFT COMPLETE
>
> You were not asked to write the code.
>
> You were not asked to inspect every line manually.
>
> You were not asked to find every possible defect.
>
> You were asked to make a decision:
>
> **Is this change safe enough to ship?**
>
> Modern development tools can generate enormous amounts of code.
>
> They can analyze that code.
>
> They can review other AI-generated code.
>
> They can summarize changes, identify unusual patterns, and point humans toward areas worth investigating.
>
> All of that can be useful.
>
> But automated analysis is not ownership.
>
> ## **Use AI. Use two AIs. Use ten AIs. Use AI to review AI-generated code.**
>
> ## **Just don't confuse automated analysis with somebody owning the decision.**

Then return to the conference hook:

> ### YOUR THROUGHPUT IS THROUGH THE ROOF.
> ### NOW HOW DO YOU TAKE OWNERSHIP OF IT?

---

# 19. The role of APE INPUT™

APE INPUT™ is a recurring fictional corporate product/joke.

The acronym is intentionally absurd:

> **AI = Ape Input**

It is a playful reference to the "millions of monkeys on millions of keyboards" idea.

The joke should remain background flavor rather than become the educational focus.

Possible recurring marketing language:

> **APE INPUT™**
>
> *Intelligence at Scale*
>
> *Millions of monkeys. Millions of keyboards. Infinite throughput.*
>
> *Human oversight sold separately.*

Use sparingly.

The participant should understand the educational message even if they completely miss the reference.

---

# 20. Desired overall story arc

The entire experience should reduce to this progression:

### 1. Learn the interface

> "What does a review decision look like?"

### 2. Learn the security lens

> "What makes a proposed change worth stopping?"

### 3. Encounter volume

> "What happens when the amount of code increases faster than human review capacity?"

### 4. Introduce automation

> "Can AI help?"

### 5. Demonstrate that it can

> "Yes. AI can find things, summarize changes, and reduce the amount of code a human needs to inspect."

### 6. Introduce uncertainty

> "But automated analysis doesn't eliminate judgment."

### 7. Introduce multiple reviewers

> "AI can be used to review AI, and disagreement can be useful."

### 8. Require human judgment

> "Someone still has to decide what ships."

### 9. Finish with ownership

> **"The machines can produce the code. They can analyze the code. They can recommend what to do with the code.**
>
> **But somebody still owns the decision."**

---

# 21. Design principles for implementing Story Mode

1. **Keep story pages short.**
   The participant came to interact with code.

2. **Every story page should have a learning purpose.**
   Remove pages that exist only to deliver another joke.

3. **Humor should reinforce the concept.**
   Airlocks represent accountability. APE INPUT represents absurdly increased throughput. Corporate management represents pressure to automate.

4. **Do not make AI intentionally stupid.**
   The educational point is stronger when the AI behaves plausibly.

5. **Do not make AI the villain.**
   AI should genuinely help.

6. **Do not make humans the infallible alternative.**
   Humans should miss things too.

7. **Do not score generic code quality.**
   Score the security judgment the exercise is designed to test.

8. **Allow "Not Enough Information" where appropriate.**
   Good review sometimes means refusing to make an unjustified decision.

9. **Do not make every exercise harder than the last.**
   Increase conceptual variety rather than creating a video-game difficulty curve.

10. **The final lesson is ownership, not AI skepticism.**

---

# 22. One-sentence description of the experience

> **You are a code reviewer trying to keep up with an AI-powered software factory, learning how humans and AI can work together to review code at scale without handing responsibility for shipping to the machines.**
