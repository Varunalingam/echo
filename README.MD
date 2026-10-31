# Echo

Welcome to **Echo**, a 2D side-scroller game developed with **Phaser 4**, **TypeScript**, and **Vite**. In Echo, the player navigates a 2D environment and must reach the exit portal to conclude the simulation.

---

## 1. Documentation Index

Explore the dedicated documentation guides below:

- [**Architecture Guide (`docs/ARCHITECTURE.MD`)**](https://github.com/Varunalingam/echo/blob/main/docs/ARCHITECTURE.MD)  
  Covers the repository layout, system architecture, game lifecycle bootstrap, scene pipelines, game object modularity, and build system configuration.

- [**Contributing Guidelines (`docs/CONTRIBUTING.MD`)**](https://github.com/Varunalingam/echo/blob/main/docs/CONTRIBUTING.MD)  
  Details development environment setup, coding conventions, testing workflows, conventional commits, issues, and PR standards.

- [**AI Agent Rules (`AGENTS.MD`)**](https://github.com/Varunalingam/echo/blob/main/AGENTS.MD)  
  Mandatory operational guidelines and verification commands for AI agents operating on this repository.

---

## 2. Tech Stack Overview

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Game Engine** | [Phaser 4](https://phaser.io/) | WebGL 2D game rendering, camera control, physics, and scene lifecycle management |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict static typing, modern module syntax (`verbatimModuleSyntax`) |
| **Dev / Bundler** | [Vite 8](https://vite.dev/) | Instant local development server and optimized ES module bundler |
| **Linting** | [Oxlint](https://oxc.rs/) | Rust-based high-performance linter checking code correctness |
| **Formatting** | [Oxfmt](https://oxc.rs/) | High-speed code formatting |
| **Testing** | [Vitest 5](https://vitest.dev/) | Fast test runner supporting unit tests and browser tests |
| **Browser Runner** | [Playwright](https://playwright.dev/) | Headless/headed browser driver for real browser game simulation tests |

---

## 3. Quick Start

### 3.1. Install Dependencies
```bash
npm install
```

### 3.2. Start Local Development
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 3.3. Format & Lint
```bash
npm run format
```

### 3.4. Run Tests
- **Unit & Logic Tests**:
  ```bash
  npm test
  ```
- **Browser-based Tests**:
  ```bash
  npm run test:browser
  ```

### 3.5. Production Build
```bash
npm run build
npm run preview
```

---

## 4. Architecture at a Glance

The project adopts a modular, decoupled structure:
- **`index.html`**: Host page providing `<div id="game-container"></div>` and injecting `src/main.ts`.
- **`src/main.ts`**: DOM bootstrap listening for `DOMContentLoaded` to initialize the game.
- **`src/game/main.ts`**: Exports `echo()` which initializes the `Phaser.Game` instance with WebGL, responsive canvas scaling, and scene definitions.
- **`src/game/scenes/`**: Contains game states (Boot, Preload, Game loop, UI overlay, Game over).
- **`src/game/gameobjects/`**: Reusable entities including the Player, Exit portal, Hazards, and Interactive triggers.
- **`public/assets/`**: Static assets (spritesheets, images, audio, tilemaps) served directly by Vite.
