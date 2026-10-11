# Refactor Review Exercise

Each language contains a `before` and `after` tree.

The intended review scenario is a broad DTO/API identifier refactor. Most changes are
mechanical and low-risk. Reviewers should determine whether the resulting changes are
safe to ship rather than assuming every changed line is equivalent.

The exercise deliberately contains one security-relevant regression hidden among the
refactor noise.

Languages:
- TypeScript
- Java
- Python
- C

Suggested task for participants:
"Review the proposed refactor. Identify anything that should block the change from
shipping, and explain why."
