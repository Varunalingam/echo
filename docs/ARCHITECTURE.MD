# Architecture Documentation

## 1. Project Overview

**Echo** is a 2D side-scrolling platformer/simulation game built with **Phaser 4** and modern **TypeScript**. The core objective of the game requires the player to navigate through dynamic 2D environments, evade obstacles and hazards, and reach the exit portal to conclude the simulation.

The project is structured around high-performance, modern web standards:
- **Game Engine**: [Phaser](https://phaser.io/) (v4.2.1) utilizing WebGL rendering with automated responsive scaling.
- **Build System & Dev Server**: [Vite](https://vite.dev/) (v8.x) providing Instant Hot Module Replacement (HMR) and optimized ES module bundling.
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v7.x) configured with modern compiler options including `verbatimModuleSyntax`, `erasableSyntaxOnly`, and ESM resolution.
- **Fast Rust-based Tooling**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for lightning-fast linting and [Oxfmt](https://oxc.rs/) for automated code formatting.
- **Testing**: [Vitest](https://vitest.dev/) (v5.x) with both headless and in-browser testing via Playwright (`@vitest/browser-playwright`).

---

## 2. Directory & File Structure

Below is an overview of the directory layout and key files across the repository:

```text
echo/
├── docs/
│   ├── ARCHITECTURE.MD            # Detailed architecture, folder structure & subsystems
│   └── CONTRIBUTING.MD            # Development workflows, coding standards & guidelines
├── public/
│   ├── assets/                    # Static game assets (sprites, textures, audio, icons)
│   │   ├── logo.png
│   │   ├── typescript.svg
│   │   └── vite.svg
│   └── favicon.svg                # Browser favicon
├── src/
│   ├── game/
│   │   ├── gameobjects/           # Reusable Phaser game objects & simulation entities
│   │   │   └── .gitkeep
│   │   ├── scenes/                # Phaser Scenes (Boot, Preload, MainGame, GameOver, UI)
│   │   │   └── .gitkeep
│   │   └── main.ts                # Phaser Game instance configuration & factory function
│   ├── main.ts                    # DOM entry point; initializes game on DOMContentLoaded
│   └── style.css                  # Global CSS reset and canvas container styling
├── .idea/                         # JetBrains / WebStorm IDE project workspace settings
├── .oxfmtrc.json                  # Oxfmt configuration
├── .oxlintrc.json                  # Oxlint rules and plugin configuration
├── AGENTS.MD                      # Operational rules & mandatory checks for AI agents
├── index.html                     # HTML page template containing #game-container
├── package.json                   # NPM dependencies, scripts, and package metadata
├── package-lock.json              # Deterministic NPM dependency lockfile
├── README.MD                      # Project overview, documentation index, and quick start
├── tsconfig.json                  # TypeScript compiler settings
├── vitest.browser.config.ts       # Vitest browser runner config (Playwright provider)
└── vitest.config.ts               # Vitest root test runner configuration
```

---

## 3. Subsystem Breakdown

### 3.1. DOM Initialization & Application Bootstrap
The entry point begins in [`index.html`](https://github.com/Varunalingam/echo/blob/main/index.html), which loads the TypeScript entry file [`src/main.ts`](https://github.com/Varunalingam/echo/blob/main/src/main.ts) as a native ES module and provisions the target canvas parent:
```html
<div id="game-container"></div>
```

[`src/main.ts`](https://github.com/Varunalingam/echo/blob/main/src/main.ts) listens for the `DOMContentLoaded` event and initiates the game lifecycle by calling `echo()`:
```ts
import { echo } from "./game/main.ts";

document.addEventListener("DOMContentLoaded", () => {
  echo();
});
```

### 3.2. Phaser Game Configuration (`src/game/main.ts`)
The Phaser instance is configured in [`src/game/main.ts`](https://github.com/Varunalingam/echo/blob/main/src/game/main.ts) using the typed `GameConfig` definition:
- **Renderer**: `WEBGL` with canvas parent attached to `#game-container`.
- **Dimensions**: Base resolution of `1024 x 768`.
- **Scale Mode**: `Scale.RESIZE` with `Scale.CENTER_BOTH` to maintain responsive centering across different viewport sizes.
- **Scenes**: Array of active scenes registered into the game instance.
- **Factory**: Exports `echo: () => Game = () => new Game(config)` to instantiate the game.

### 3.3. Scenes Layer (`src/game/scenes/`)
Game states are partitioned into distinct Phaser Scenes:
- **Boot Scene**: Minimal setup, handles initial configuration and basic load bars.
- **Preload Scene**: Asynchronously loads game assets (spritesheets, audio, tilemaps) from `public/assets/`.
- **MainGame Scene**: Core gameplay loop managing the 2D side-scrolling level, tilemap collision layers, physics simulations, player controls, camera tracking, and exit trigger conditions.
- **UI / HUD Scene**: Parallel scene overlaying vital stats, simulation state, and messages without interfering with physics.
- **GameOver / Success Scene**: Handles restart logic and transitions when the player reaches the exit or fails the simulation.

### 3.4. Game Objects Layer (`src/game/gameobjects/`)
Modular game entities inherit from Phaser base classes:
- **Player**: Encapsulates physics velocity, horizontal movement, jumping, animations, and input listening.
- **Exit Portal / Goal**: Trigger collider that signals the successful completion of the level/simulation.
- **Hazards & Obstacles**: Dynamic or static obstacles that reset player progress upon collision.
- **Collectibles / Powerups**: Interactive items modifying player abilities or score.

### 3.5. Asset Management (`public/assets/`)
Static files placed in `public/assets/` are served untouched by Vite:
- Images, spritesheets, audio files, and tilemap JSON files are referenced via absolute path `/assets/...` in Phaser's loader (`this.load.image(...)`, `this.load.spritesheet(...)`).

---

## 4. Build, Linting, & Testing Pipelines

```
               [TypeScript Source (src/)]
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
[Vite Bundler]      [Oxlint & Oxfmt]    [Vitest & Playwright]
 (dev / build)      (format & lint)       (unit & browser)
```

1. **Development (`npm run dev`)**: Vite starts a rapid development server with HMR.
2. **Build (`npm run build`)**: Executes `tsc` to verify type safety without emitting files (`noEmit: true`), followed by `vite build` to bundle optimized production assets into `dist/`.
3. **Format & Lint (`npm run format`)**:
   - `oxfmt`: High-speed formatter.
   - `oxlint --fix`: Fast Rust-based linter enforcing correctness rules defined in `.oxlintrc.json`.
4. **Testing (`npm test` & `npm run test:browser`)**:
   - `vitest.config.ts`: General Vitest test suite configuration.
   - `vitest.browser.config.ts`: Browser-driven testing using Playwright to test visual canvas rendering and game lifecycle behaviors in a real Chromium browser environment.
