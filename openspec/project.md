# Project Context
## Purpose
Productivity Hub is a collection of standalone productivity tools built as a single Next.js application. The goal is to provide quick, no-signup, browser-based utilities for everyday tasks like timers, converters, generators, and trackers.
## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **State Management**: React hooks (useState, useEffect) - no external state library
- **Node.js**: v22.19.0
- **Package Manager**: npm v10.9.3
## Project Conventions
### Code Style
- Use TypeScript strict mode
- Client components must include `"use client"` directive at top
- Prefer functional components with hooks
- Use descriptive variable names in camelCase
- Keep components focused and single-purpose
### Architecture Patterns
**Route Structure:**
```
app/
├── page.tsx              # Dashboard with tool grid
├── layout.tsx            # Root layout with metadata
├── globals.css           # Global styles + animations
└── tools/
    └── [tool-name]/
        └── page.tsx      # Individual tool page
```
**Tool Page Pattern:**
```typescript
"use client";
import { useState } from "react";
import Link from "next/link";

export default function ToolName() {
  // State and logic
  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link href="/" className="...">← Back</Link>
      <div className="max-w-4xl mx-auto">
        {/* Tool content */}
      </div>
    </div>
  );
}
```
### Design System (Brutalist Style)
All UI follows a consistent brutalist design:
- **Borders**: 4px mobile, 8px desktop (`border-4 sm:border-8 border-black`)
- **Shadows**: Hard offset shadows (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`)
- **Hover**: Translate + larger shadow (`hover:shadow-[6px_6px...] hover:translate-x-[-2px] hover:translate-y-[-2px]`)
- **Typography**: Uppercase, font-black for headers
- **Colors**: Solid colors (no gradients), high contrast
- **Background**: White base
### Responsive Design
Mobile-first approach using Tailwind breakpoints:
- Base: Mobile styles
- `sm:` (640px): Tablet
- `lg:` (1024px): Desktop
- `xl:` (1280px): Large screens
### Testing Strategy
No formal testing framework configured yet. Manual browser testing across devices.
### Git Workflow
- Single `main` branch
- Descriptive commit messages without AI attribution
- Feature commits should be atomic and focused
## Domain Context
Tools are standalone utilities that:
- Work entirely client-side (no backend required for most)
- Don't require user authentication
- Store data in browser state only (no persistence between sessions)
- Are designed for quick, one-off use
## Important Constraints
- No user accounts or authentication
- No server-side data storage
- All tools must work offline after initial load (except API-dependent ones like exchange rates)
- Maintain brutalist design consistency across all tools
- Support mobile and desktop viewports
## External Dependencies
- **exchangerate-api.com**: Free currency exchange rate API (used by exchange-rate tool)
- **No other external APIs currently**
## Existing Tools (20)
1. One Minute Focus - Breathing exercise timer
2. Flip a Coin - Random coin flip
3. Pomodoro Timer - Work/break timer
4. To-Do List - Task management
5. Quick Notes - Note-taking
6. Random Number - Number generator
7. Password Generator - Secure passwords
8. Dice Roller - Multi-dice roller
9. Stopwatch - Time tracker
10. Word Counter - Text analysis
11. Calculator - Basic math
12. Habit Tracker - Daily habits
13. Countdown Timer - Birthday countdown
14. Unit Converter - Unit conversions
15. Tip Calculator - Bill splitting
16. BMI Calculator - Health metric
17. QR Generator - QR code creation
18. Color Palette - Color schemes
19. Expense Tracker - Spending tracker
20. Exchange Rate - Multi-currency to TWD converter
