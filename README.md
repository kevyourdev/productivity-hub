# Productivity Hub
Your personal collection of productivity tools in one place.
## Features
### Available Tools
**🎯 One Minute Focus**
- Brief breathing exercises to improve mental focus
- Configurable duration (0.5 or 1 minute)
- Animated breathing dot with countdown timer
- Perfect for quick mental resets between tasks
### Coming Soon
- **🍅 Pomodoro Timer**: Time management using the Pomodoro Technique
- **✅ To-Do List**: Simple and effective task management
- **📝 Quick Notes**: Capture your thoughts instantly
## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: React 19
## Getting Started
### Prerequisites
- Node.js 20+
- npm or yarn
### Installation
```bash
npm install
```
### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
### Production Build
```bash
npm run build
npm start
```
## Project Structure
```
productivity-hub/
├── app/
│   ├── tools/
│   │   └── one-minute-focus/
│   │       └── page.tsx       # One Minute Focus tool
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Dashboard home
│   └── globals.css            # Global styles
└── package.json               # Dependencies
```
## Adding New Tools
To add a new tool to the hub:
1. Create a new route in `app/tools/[tool-name]/page.tsx`
2. Add the tool to the `tools` array in `app/page.tsx`
3. Build your tool's UI and functionality
## License
MIT
