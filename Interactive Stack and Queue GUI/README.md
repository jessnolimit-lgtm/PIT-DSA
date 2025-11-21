# Interactive Stack and Queue GUI

This repository contains a small interactive visualizer for two basic data structures: Stack and Queue. It includes a React version (`src/App.tsx`) and a plain JavaScript implementation (`src/script.js`) used for reference or static hosting.

Source design inspiration: https://www.figma.com/design/MbVpMxhuI09oUgSvjz63Wp/Interactive-Stack-and-Queue-GUI

## Prerequisites

- Node.js (LTS recommended) and npm
- Recommended: run commands from Command Prompt (`cmd.exe`) or use `npm.cmd` in PowerShell if your PowerShell execution policy blocks script files.

## Install & Run

Install dependencies:

```powershell
cd "c:\Users\tidul\OneDrive\Desktop\Final PIT DSA\Interactive Stack and Queue GUI"
npm.cmd install
```

Start development server:

```powershell
npm.cmd run dev
```

Open the URL shown by Vite (usually `http://localhost:3000/` — Vite will pick another port automatically if 3000 is busy).

If you prefer PowerShell and see an execution policy error when running `npm` scripts, you can run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

## Project structure (high level)

- `index.html` — root HTML for static demo (also used by Vite during dev). Contains the base DOM markup and references `script.js` for the non-React demo.
- `package.json` — project manifest and dependencies.
- `vite.config.ts` — Vite configuration and some import aliases (aliases like `vaul@1.1.2` map to `vaul` to support version-suffixed imports in components).
- `src/` — application source code
  - `App.tsx` — React single-file application that builds the same interactive Stack/Queue UI using a useEffect hook and direct DOM manipulation. This is the entry used by the React app.
  - `main.tsx` — React entry point that mounts `App` into the DOM.
  - `index.html` — app HTML (used by Vite). Mirrors the static `index.html` top-level file and contains the same UI markup.
  - `index.css`, `styles.css`, `src/styles/globals.css` — stylesheet files used by the app for layout and theme.
  - `script.js` — Plain JavaScript implementation of the visualizer (DOM + event listeners). Useful if you want a non-React static version.
  - `Attributions.md` — design/asset attribution notes.
  - `components/` — UI helper components and utilities (mostly Radix / UI primitives wrappers):
    - `figma/ImageWithFallback.tsx` — small utility component for loading images with a fallback.
    - `ui/` — a collection of reusable UI primitives (accordion, dialog, drawer, tooltip, buttons, etc.). These are generic primitives used across the UI. File names reflect the component they export, e.g. `drawer.tsx`, `dialog.tsx`, `button.tsx`, etc.

## Where the core Stack and Queue logic lives

There are two implementations in the repository:

1. React-based (used when running the React app via Vite):
   - File: `src/App.tsx`
   - Key pieces:
     - State variables: `currentStructure`, `stackItems: string[]`, `queueItems: string[]`.
     - Core operation functions:
       - `handleAdd()` — reads input and either `stackItems.push(value)` (stack) or `queueItems.push(value)` (queue).
       - `handleRemove()` — for stack uses `stackItems.pop()`; for queue uses `queueItems.shift()`.
       - `handlePeek()` — for stack uses `stackItems[stackItems.length - 1]`; for queue uses `queueItems[0]`.
       - `handleClear()` — clears the current structure's array.
     - UI synchronization functions:
       - `updateUI()` — updates UI counters, button states, and triggers rendering.
       - `renderVisualization()`, `renderStack(items)`, `renderQueue(items)` — generate HTML and write it to the visualization container.
     - Event wiring: the component attaches event listeners (button clicks, input events) in a `useEffect` and updates the visualization by writing into `visualization-container`.

2. Plain JavaScript implementation (static demo):
   - File: `src/script.js` (and the static `index.html` used for non-React demos)
   - The code mirrors the React version: arrays `stackItems` and `queueItems`, and the same functions `handleAdd`, `handleRemove`, `handlePeek`, `handleClear`, plus `renderStack`/`renderQueue`.

Notes about the implementations:
- The stack uses JavaScript array `push`/`pop` where the top of the stack is the array's end. These are O(1) operations.
- The queue uses `push` to enqueue and `shift` to dequeue. `shift` is O(n) because it reindexes the array — for small demos this is fine; for large-scale data use a linked list or circular buffer for O(1) dequeues.
- Both implementations update the UI by manipulating the DOM (`innerHTML`, class toggles). The React `App.tsx` currently uses direct DOM manipulation inside `useEffect` rather than idiomatic React state + JSX. It works, but can be refactored to use `useState` / `useRef` and conditional JSX rendering for clearer React patterns.

## Important implementation details & gotchas

- `App.tsx` and `script.js` both assume the DOM contains elements with specific IDs and classes (e.g., `#element-input`, `.structure-btn`, `#visualization-container`). If you edit markup, keep IDs/classes in sync.
- In development on Windows PowerShell you may hit an execution policy block when running `npm` scripts; `npm.cmd` or running from `cmd.exe` avoids that.
- `vite.config.ts` includes aliases that map imports with version suffixes to plain package names — e.g., `'vaul@1.1.2': 'vaul'`. This is done because some components import packages using a versioned name (like `import { Drawer } from 'vaul@1.1.2'`). Keep aliases in sync with `package.json` if you change package versions.

## Testing & manual checks

1. Start dev server (`npm.cmd run dev`) and open the shown URL.
2. Try the main flows:
   - Switch between Stack and Queue.
   - Add multiple elements; verify visualization and `Size` updates.
   - Remove elements (Pop / Dequeue) and observe animations.
   - Use Peek and Clear.
3. Watch browser console for runtime errors (null DOM lookups or missing element IDs). If you see errors referencing `document.getElementById(...)` returning `null`, check that the DOM markup includes the element with the correct ID.

## Suggested improvements

- Convert `App.tsx` to idiomatic React: use `useState` for `stackItems` / `queueItems`, render JSX for visualization instead of `innerHTML`, and use `ref`s for direct node access when needed. This will make the component easier to maintain and type-check.
- Replace `queueItems.shift()` with a queue implementation that provides O(1) dequeue (circular buffer or linked list) if you expect many operations.
- Add TypeScript types and enable stricter compiler options. Install `typescript` and `@types/react` / `@types/react-dom` as devDependencies:

```powershell
npm.cmd install -D typescript @types/react @types/react-dom
```

## Where to look for help

- `src/App.tsx` — main React logic and a good starting point for understanding app flow.
- `src/script.js` — plain JS version that mirrors behavior and is easier to reason about if you prefer DOM code.
- `src/components/ui/*` — reusable UI primitives; mostly wrappers around Radix / design-system pieces.

If you want, I can:
- Refactor `App.tsx` to use `useState` + JSX rendering.
- Replace the queue implementation with a O(1) deque/queue.
- Add unit tests for the core algorithms.

---
Generated on 2025-11-21 — updated to document files and how the visualizer maps to code.

  # Interactive Stack and Queue GUI

  This is a code bundle for Interactive Stack and Queue GUI. The original project is available at https://www.figma.com/design/MbVpMxhuI09oUgSvjz63Wp/Interactive-Stack-and-Queue-GUI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  