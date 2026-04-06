## Train with cat

Please respond and work in Korean.

## Project Overview

- **Next.js 16 (App Router)** + **React 19** + **TypeScript 5 (strict)**
- **TailwindCSS v4** – CSS variable-based design system
- **React Compiler** (Babel plugin) – auto memoization enabled

## Common Commands

```bash
bun run dev      # Start dev server (localhost:5173)
bun run build    # Production build
bun run lint     # Run ESLint
```

## Architecture

**Path alias**: `@/` → `src/`

## Design System

Theme is defined via CSS variables in `app/globals.css` — **no tailwind.config.ts** (TailwindCSS v4 uses `@theme inline`).

**Color tokens**: Not Defined

**Dark mode**: Not Defined

**Typography**: Not Defined

## Code Conventions

- **File names**: kebab-case (e.g., `profile-card.tsx`)
- **Components**: PascalCase with `ComponentNameProps` interface pattern
- **Styling**: Tailwind utility classes only — no inline styles
- **Variants**: Define a `const variantStyles = {}` object, index into it for conditional classes
- **No manual memoization**: React Compiler handles it — avoid unnecessary `useMemo`/`useCallback`
