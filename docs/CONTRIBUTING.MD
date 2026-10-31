# Contributing to Echo

Thank you for contributing to **Echo**! This document provides guidelines and workflows for developers and AI contributors to maintain code quality, consistency, and stability.

---

## 1. Prerequisites

Before getting started, ensure you have the following installed on your machine:
- **Node.js**: Modern LTS version (v20+ recommended).
- **npm**: v10+ (packaged with Node.js).
- **Browsers for Playwright** (optional, for browser-based testing):
  ```bash
  npx playwright install chromium
  ```

---

## 2. Setup & Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd echo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 3. Development Workflow

The project uses [Vite](https://vite.dev/) for instant dev server startup and hot module replacement.

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Open the displayed localhost URL (typically `http://localhost:5173`) in your browser to play and test the game.

- **Build for Production**:
  ```bash
  npm run build
  ```
  This runs `tsc` for TypeScript type validation followed by `vite build` to output production assets to `dist/`.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

---

## 4. Code Quality & Formatting

We use **Oxlint** and **Oxfmt** for ultra-fast linting and code formatting.

- **Run Formatter and Linter**:
  ```bash
  npm run format
  ```
  This command executes:
  - `oxfmt` to format code according to `.oxfmtrc.json`.
  - `oxlint --fix` to check and automatically correct code issues per `.oxlintrc.json`.

Always run `npm run format` before staging and committing changes.

---

## 5. Testing

We employ **Vitest** for testing:
- **Unit / Logic Tests**:
  ```bash
  npm test
  ```
  or run single-pass without watch mode:
  ```bash
  npx vitest run
  ```

- **Browser-based Simulation Tests**:
  ```bash
  npm run test:browser
  ```
  This runs Vitest in browser mode powered by Playwright (`vitest.browser.config.ts`), validating canvas creation, WebGL context, and game loop behavior in a real browser instance.

---

## 6. Coding Standards & Conventions

- **TypeScript**:
  - Keep types strict. Avoid `any`.
  - Use `verbatimModuleSyntax` compatible imports (explicit `.ts` extensions or type imports where required).
  - Ensure `tsc` passes without errors on `npm run build`.

- **Phaser Architecture**:
  - Keep scenes modular inside `src/game/scenes/`.
  - Place custom game objects, physics bodies, and controllers inside `src/game/gameobjects/`.
  - Keep static assets organized within `public/assets/`.
  - Avoid putting game logic inside the top-level `src/main.ts` or DOM controllers; delegate all simulation logic to Phaser scenes.

---

## 7. Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for clear, readable, and machine-parsable commit histories.

### 7.1. Commit Format
```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 7.2. Allowed Types
- **`feat`**: A new user-facing feature or game mechanic (e.g., `feat(player): add double jump capability`).
- **`fix`**: A bug fix in physics, collision, rendering, or UI (e.g., `fix(physics): resolve terrain clipping during fall`).
- **`docs`**: Documentation changes only (e.g., `docs: update contributing guide with commit standards`).
- **`style`**: Formatting, missing semicolons, whitespace changes that do not affect code logic.
- **`refactor`**: Code refactoring that neither fixes a bug nor adds a feature (e.g., `refactor(scenes): decompose preload asset loading`).
- **`perf`**: Performance optimizations (e.g., `perf(rendering): optimize tilemap sprite batching`).
- **`test`**: Adding missing tests or refactoring test suites (e.g., `test(browser): add Playwright canvas mount verification`).
- **`chore`**: Build configuration, tool updates, dependency upgrades (e.g., `chore: update oxlint configuration`).

### 7.3. Scopes
Common scopes to qualify commits:
- `player`: Player entity, controls, and states
- `scenes`: Phaser scene lifecycle, transitions, overlays
- `physics`: Arcade/Matter physics, collision systems, bounds
- `assets`: Spritesheets, textures, audio, tilemaps
- `browser`: Browser tests and Playwright runner
- `build`: Vite, TypeScript, or bundle configuration

### 7.4. Breaking Changes
Indicate breaking changes with a `!` after the type/scope or by including `BREAKING CHANGE:` in the footer:
```text
feat(scenes)!: replace legacy scene registry with dynamic scene loader
```

---

## 8. GitHub Issues

Issues help track bugs, game design proposals, and feature requests.

### 8.1. Reporting Bugs
When filing a bug report:
1. Search existing issues first to avoid duplicates.
2. Provide a clear, descriptive title (e.g., `[Bug] Player clips through one-way platforms at high velocity`).
3. Include:
   - **Environment**: OS, Node version, browser version.
   - **Steps to Reproduce**: Step-by-step instructions.
   - **Expected Behavior**: What should happen.
   - **Actual Behavior**: What actually happened (include browser console errors, screenshots, or screen recordings if applicable).

### 8.2. Feature Requests & Game Ideas
When proposing features or game mechanics:
1. Clearly outline the proposed mechanic or improvement.
2. Explain how it enhances the gameplay loop or simulation narrative.
3. Suggest an implementation approach (affected scenes, game objects, assets) if known.

---

## 9. Pull Requests (PRs)

We welcome pull requests from all contributors!

### 9.1. Branching Strategy
- Branch from `main`.
- Use descriptive branch names with conventional prefixes:
  - `feat/player-wall-slide`
  - `fix/exit-portal-trigger`
  - `docs/update-architecture`

### 9.2. Pull Request Checklist
Before submitting a pull request, ensure:
- [ ] Code compiles cleanly: `npm run build` (`tsc && vite build`).
- [ ] Code is formatted and linted: `npm run format` (`oxfmt && oxlint --fix`).
- [ ] Tests pass without errors: `npm test` or `npx vitest run`.
- [ ] Browser tests pass if applicable: `npm run test:browser`.
- [ ] Commit messages follow the [Conventional Commits](#7-conventional-commits) specification.
- [ ] The PR links to the relevant GitHub issue (e.g., `Closes #42` or `Fixes #18`).

### 9.3. PR Description Template
```markdown
## Description
Summary of the changes made and the motivation behind them.

## Related Issue
Closes #<issue-number>

## Changes Made
- Added ...
- Fixed ...

## How to Test
1. Run `npm run dev`
2. Open `http://localhost:5173`
3. Verify that ...
```

---

## 10. AI Agent Guidelines

If you are an automated AI agent modifying the codebase, refer to [`AGENTS.MD`](https://github.com/Varunalingam/echo/blob/main/AGENTS.MD).

Agents are required to execute:
1. `npm test` (or `npm run tests` / `npx vitest run`)
2. `npm run format`

at the conclusion of every action before completing the task.
