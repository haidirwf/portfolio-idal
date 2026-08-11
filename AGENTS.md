<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# GIT & VERSION CONTROL RULES

Commit: Automatically create a git commit for every completed change/task.

Push: DO NOT run git push under any circumstances unless explicitly instructed by the user.

Verification: After committing, run npm run build to verify there are no build or compilation errors.


# UI/UX & LANGUAGE RULES

Always maintain a clean, modern, and professional aesthetic consistent with the project's design system.

Default Language: All text, labels, and content must be displayed in English (EN) by default.

Localization Support: If a translation is required, implement proper i18n (internationalization) support.

User Preference: Respect the user's currently selected language. Do not switch languages unless explicitly requested.

Never assume or force a switch to Indonesian (ID) unless the user specifically asks for translation.

# AI AGENT RULES

-   DO NOT push any commit to GitHub unless explicitly instructed by the user.
-   Always verify build success (npm run build) after making changes.
-   Maintain a clean, modern, and professional UI/UX.
-   Always respect the user's current language preference for any output or display.
-   Always use rtk and ponytail skills.