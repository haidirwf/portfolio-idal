<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# GIT & VERSION CONTROL RULES

- **Commit**: Automatically create a git commit only on the `dev` branch for every completed change/task.
- **Merge**: DO NOT merge `dev` to `main` unless explicitly requested by the user.
- **Push**: DO NOT run `git push` under any circumstances unless explicitly instructed by the user.
- **Verification**: After committing, always run `rtk npm run build` to verify there are no build or compilation errors.

# UI/UX & LANGUAGE RULES

- **Aesthetic**: Maintain a clean, modern, and professional UI/UX consistent with the project's design system.
- **Default Language**: Display all text, labels, and content in English (EN) by default.
- **Localization**: Respect the user's currently selected language and implement proper i18n support. Never force a switch to Indonesian (ID) unless explicitly asked.

# TOOLING RULES

- **Required Skills**: Always use `rtk` and `ponytail` skills for executing commands and managing code quality.