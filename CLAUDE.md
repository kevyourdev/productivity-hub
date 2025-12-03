<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Productivity Hub is a collection of standalone productivity tools built with Next.js 15, TypeScript, and Tailwind CSS. The application uses a brutalist design aesthetic with bold borders (8px desktop, 4px mobile), hard shadows, uppercase typography, and solid colors.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3.4**

### Project Structure
```
app/
├── tools/                    # Individual tool pages
│   ├── one-minute-focus/    # Breathing exercise with animated dot
│   ├── flip-a-coin/         # Coin flip with history tracking
│   ├── pomodoro/            # 25/5/15 minute timer with counter
│   ├── todo/                # Task management with stats
│   ├── notes/               # Note-taking with two-column layout
│   ├── random-number/       # Number generator with history
│   ├── password-generator/  # Password gen with character options
│   └── dice-roller/         # Multi-dice roller with presets
├── layout.tsx               # Root layout with viewport meta tag
├── page.tsx                 # Dashboard with tool grid
└── globals.css              # Global styles + breathe animation
```

### Design System (Brutalist Style)

All tools follow a consistent brutalist design pattern:

**Desktop (sm: breakpoint and above):**
- Borders: 8px solid black
- Shadows: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`
- Hover: `shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]` with translate
- Typography: Uppercase, font-black
- Padding: Generous (p-8)

**Mobile (below sm: breakpoint):**
- Borders: 4px solid black
- Shadows: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Hover: `shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`
- Reduced padding (p-4 to p-6)
- Smaller text sizes

**Responsive Breakpoints:**
- Mobile-first approach
- `sm:` (640px) - Tablet
- `lg:` (1024px) - Desktop
- `xl:` (1280px) - Large screens

### State Management

All tools use React hooks for local state management:
- `useState` for component state
- `useEffect` for side effects (timers, intervals)
- No global state management library

### Adding New Tools

1. Create route: `app/tools/[tool-name]/page.tsx`
2. Add to `tools` array in `app/page.tsx`:
   ```typescript
   {
     id: "tool-id",
     name: "Tool Name",
     description: "Brief description",
     icon: "🎯",
     href: "/tools/tool-id",
     color: "bg-color-class",
   }
   ```
3. Use client components (`"use client"` directive)
4. Follow brutalist design patterns with responsive classes
5. Include "← Back" link to dashboard with brutalist styling

### Key Patterns

**Tool Page Structure:**
```typescript
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ToolName() {
  // State and logic

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link href="/" className="inline-block border-4 border-black...">
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Header with brutalist border/shadow */}
        {/* Tool content */}
      </div>
    </div>
  );
}
```

**Responsive Class Pattern:**
```typescript
className="
  border-4 sm:border-8
  p-4 sm:p-8
  text-lg sm:text-2xl
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
"
```

### Custom Animations

The `breathe` animation in `globals.css` is used by the One Minute Focus tool:
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.8); }
}
```
Apply with: `style={{ animation: 'breathe 4s ease-in-out infinite' }}`

### Tool-Specific Notes

- **One Minute Focus**: Uses breathing animation with 30s/60s timer options
- **Flip a Coin**: Tracks last 10 flips with heads/tails statistics
- **Pomodoro**: 25/5/15 minute modes with completed pomodoros counter
- **To-Do List**: Enter key support, total/active/done statistics
- **Quick Notes**: Edit mode, two-column layout (desktop)
- **Random Number**: Min/max inputs with history of last 10 generations
- **Password Generator**: 8-64 chars, uppercase/lowercase/numbers/symbols options
- **Dice Roller**: 1-10 dice, D4/D6/D8/D10/D12/D20 presets

### MCP Servers

This project uses the Vercel MCP server for deployment management:
- **Configuration**: `.mcp.json` in project root
- **Server**: `https://mcp.vercel.com` (HTTP-based with OAuth)
- **Authentication**: Will prompt for OAuth when first using Vercel tools

### Deployment

Not yet deployed. Vercel MCP server is configured and ready for deployment.

## GitHub Integration

### Claude GitHub Action
This repository is configured with Claude Code GitHub Action for automated development.

**Setup Required (one-time):**
1. Install the Claude GitHub App: https://github.com/apps/claude
2. Add `ANTHROPIC_API_KEY` secret to repository settings

**Usage:**
- Comment `@claude [your request]` on any issue or PR
- Claude will analyze, implement, and respond
- For issues: Claude can create PRs with implementations
- For PRs: Claude can review, suggest changes, or push commits

**Workflows:**
- `.github/workflows/claude.yml` - Claude Code Action (responds to @claude mentions)
- `.github/workflows/ci.yml` - CI/CD pipeline (build + lint on PRs and pushes)

**Examples:**
```
@claude Please implement this feature
@claude Fix the bug described in this issue
@claude Review this PR and suggest improvements
@claude Add tests for the todo component
```
