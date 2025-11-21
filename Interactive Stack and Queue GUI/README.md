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

# Interactive Stack and Queue GUI

This is a code bundle for Interactive Stack and Queue GUI. The original project is available at https://www.figma.com/design/MbVpMxhuI09oUgSvjz63Wp/Interactive-Stack-and-Queue-GUI.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
  