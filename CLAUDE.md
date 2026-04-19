# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Type-check + build to dist/
npm run preview  # Preview production build
```

## Architecture

State management lives entirely in `src/hooks/useTodos.ts` — a single custom hook that owns the todo array, the active filter, and all mutations (add, toggle, delete, edit, clearCompleted, toggleAll). Todos are persisted to `localStorage` under the key `claude-todos` via a `useEffect`.

`src/App.tsx` consumes `useTodos` and composes three presentational components:

- `TodoInput` — text field + toggle-all button
- `TodoItem` — individual row with inline double-click editing (Enter commits, Escape cancels, blur commits)
- `TodoFooter` — item count, filter tabs (all / active / completed), clear-completed button

`src/types.ts` defines the shared `Todo` interface and `FilterType` union — import from there rather than re-declaring.

All styling is in `src/index.css` (no CSS modules or CSS-in-JS).
