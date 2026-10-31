# Agent Instructions (AGENTS.MD)

This document provides mandatory operational guidelines and verification protocols for AI coding agents operating on the **Echo** repository.

---

## 1. Mandatory Post-Action Verification (CRITICAL)

> [!IMPORTANT]
> At the end of **ALL** actions, edits, refactors, or feature implementations, the agent **MUST** execute the following verification commands before concluding the task:
> 
> 1. **Run Tests**:
>    ```bash
>    npm run test -- --run
>    ```
>    Ensure that all test suites pass without regressions. If any test fails, diagnose and resolve the failure before proceeding.
> 
> 2. **Run Formatter & Linter**:
>    ```bash
>    npm run format
>    ```
>    This runs `oxfmt` and `oxlint --fix` to format changed files and fix any linting errors automatically according to `.oxfmtrc.json` and `.oxlintrc.json`.

---

## 2. Test Configuration & Playwright Browser Runner

The repository uses **Vitest** for both logic and browser-based testing:
- **`vitest.config.ts`**: Base Vitest configuration for general and unit tests.
- **`vitest.browser.config.ts`**: Dedicated browser test configuration using `@vitest/browser-playwright` provider:
  ```ts
  import { playwright } from '@vitest/browser-playwright'
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [
          {
            browser: 'chromium',
          },
        ],
      },
    },
  })
  ```
- **Single-run Execution**: When running in automated or non-interactive environments, append `--run` (e.g. `npx vitest run` or `npm test -- --run`) to prevent Vitest from hanging in interactive watch mode.
- **Browser Tests**: Execute `npm run test:browser -- --run` when browser verification is required.

---

## 3. Project Architecture & Conventions

Agents must adhere to the following architectural boundaries and project conventions:

### 3.1. File & Directory Layout
- **Game Bootstrap**: [`src/main.ts`](https://github.com/Varunalingam/echo/blob/main/src/main.ts) listens for `DOMContentLoaded` and initializes the Phaser game by calling `echo()`.
- **Game Configuration**: [`src/game/main.ts`](https://github.com/Varunalingam/echo/blob/main/src/game/main.ts) holds the typed `Phaser.Types.Core.GameConfig` (WebGL, 1024x768, `Scale.RESIZE`, scenes array) and exports the `echo()` factory function.
- **Phaser Scenes**: Place all scene classes inside [`src/game/scenes/`](https://github.com/Varunalingam/echo/tree/main/src/game/scenes/).
- **Game Objects**: Place modular entity classes (player, hazards, platforms, portals) inside [`src/game/gameobjects/`](https://github.com/Varunalingam/echo/tree/main/src/game/gameobjects/).
- **Static Assets**: Place game assets (images, spritesheets, audio, tilemaps) inside [`public/assets/`](https://github.com/Varunalingam/echo/tree/main/public/assets/) and reference them with absolute `/assets/...` paths.
- **Documentation**: Keep architecture, contribution guidelines, and documentation up to date inside [`docs/`](https://github.com/Varunalingam/echo/tree/main/docs/).

### 3.2. TypeScript Strictness
- Follow the compiler options in [`tsconfig.json`](https://github.com/Varunalingam/echo/blob/main/tsconfig.json):
  - `verbatimModuleSyntax: true`
  - `erasableSyntaxOnly: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `allowImportingTsExtensions: true`
- Avoid `any` types; use precise Phaser types where available.
- Verify TypeScript compilation using `npm run build` (`tsc && vite build`).

### 3.3. Formatting & Linting
- Never manually introduce inconsistent formatting; always execute `npm run format`.
- Adhere to the Oxlint rules configured in [`.oxlintrc.json`](https://github.com/Varunalingam/echo/blob/main/.oxlintrc.json).
