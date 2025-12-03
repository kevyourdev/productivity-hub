# Change: Add Comprehensive Animation System
## Why
The productivity hub currently has minimal animations, making interactions feel static and abrupt. Adding a polished animation system will improve user experience by providing visual feedback, smoother transitions, and a more premium feel that complements the brutalist design.
## What Changes
- Install `@formkit/auto-animate` library for lightweight automatic animations
- Add page entrance animations (stagger effect on dashboard cards)
- Add micro-interactions (button hovers, clicks, loading states)
- Add page transition effects between dashboard and tool pages
- Enhance existing hover states with smooth transitions
- Add loading/skeleton states for async operations (e.g., exchange rate fetching)
## Impact
- Affected specs: `animations` (new capability)
- Affected code:
  - `app/layout.tsx` - Add AutoAnimate provider
  - `app/page.tsx` - Dashboard card entrance animations
  - `app/tools/*/page.tsx` - Tool page animations
  - `app/globals.css` - Additional keyframe animations
  - `package.json` - New dependency
