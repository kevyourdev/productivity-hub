# Change: Update Dice Roll Animation
## Why
The current dice roll animation uses a simple shake effect. Users expect to see a visual dice rolling animation that simulates actual dice tumbling before revealing results.
## What Changes
- Add animated dice face cycling during roll
- Show dice faces rapidly changing (1→6→3→2→5→4...) before landing on result
- Maintain shake effect but combine with face cycling
## Impact
- Affected specs: `animations` (modify Tool-Specific Animations requirement)
- Affected code: `app/tools/dice-roller/page.tsx`
