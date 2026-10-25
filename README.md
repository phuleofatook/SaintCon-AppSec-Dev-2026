# SAINTCON Spaceways — Flight 26

Local TypeScript starter for the AppSec code-review challenge.

## Premise

A booth experience built around a skill developers increasingly need: reviewing more code than they personally wrote and deciding what is safe to trust.

The goal isn't to turn developers into penetration testers or teach them to reject anything that looks suspicious. It's to practice making a good merge decision while recognizing security-sensitive changes.

The AI angle is that AI-assisted development is increasing the volume and speed of code developers need to review. The exercise doesn't need to reveal whether a change was written by a human or AI; the developer still has to decide whether it should become trusted code.

Attendees are presented with small, self-contained, PR-style code changes and have to decide Approve or Deny. A ~10-minute attendee might review a few changes; people who want more can work through a larger randomized set and see their score. The scenarios would include:

- :white_check_mark: Safe changes that should be approved
- :closed_lock_with_key: Legitimate security fixes that should be approved
- :x: Security vulnerabilities that should be rejected
- :bug: Non-security bugs that should also be rejected
- :large_yellow_circle: Harder cases involving pre-existing vulnerabilities where whether to block the current change requires engineering judgment

## Initialize
```bash
npm install
```

## Run locally

```bash
npm run dev
```

Vite prints the local address (normally `http://localhost:5173`).

Local and gateway-hosted sessions both send anonymous exercise start/completion signals to `https://appsec.community/api/activity`. Review decisions and scores are never transmitted.

The title-screen **Reset Progress** control clears Navigator session state plus the anonymous participant and browser-session identifiers, then reloads for the next attendee. Any queued, unsent events are retained for delivery.

## Production build

```bash
npm run build
npm run preview
```

The entry page is in `index.html`; TypeScript lives in `src/main.ts` and its styles in `src/styles.css`.

## Docker

Build and run the production nginx image:

```bash
docker compose up --build
```

Open <http://localhost:8089>. The Vite build uses relative asset URLs so the same image also works behind the AppSec Community Academy gateway at `/navigators/`.

## References
### Con
https://saintcon.org/communities/appsec/

### Subject matter
https://claude.dev/blog/solving-code-review-at-anthropic/
