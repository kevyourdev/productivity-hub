import Link from "next/link";

const tools = [
  {
    id: "one-minute-focus",
    name: "One Minute Focus",
    description: "Improve mental focus through brief breathing exercises",
    icon: "🎯",
    href: "/tools/one-minute-focus",
    color: "bg-black",
  },
  {
    id: "flip-a-coin",
    name: "Flip a Coin",
    description: "Make decisions with a simple coin flip",
    icon: "🪙",
    href: "/tools/flip-a-coin",
    color: "bg-yellow-400",
  },
  {
    id: "pomodoro",
    name: "Pomodoro Timer",
    description: "Time management using the Pomodoro Technique",
    icon: "🍅",
    href: "/tools/pomodoro",
    color: "bg-red-600",
  },
  {
    id: "todo",
    name: "To-Do List",
    description: "Simple and effective task management",
    icon: "✅",
    href: "/tools/todo",
    color: "bg-blue-600",
  },
  {
    id: "notes",
    name: "Quick Notes",
    description: "Capture your thoughts instantly",
    icon: "📝",
    href: "/tools/notes",
    color: "bg-purple-600",
  },
  {
    id: "random-number",
    name: "Random Number",
    description: "Generate random numbers instantly",
    icon: "🔢",
    href: "/tools/random-number",
    color: "bg-green-500",
  },
  {
    id: "password-generator",
    name: "Password Gen",
    description: "Create secure random passwords",
    icon: "🔒",
    href: "/tools/password-generator",
    color: "bg-pink-500",
  },
  {
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll dice for games and decisions",
    icon: "🎲",
    href: "/tools/dice-roller",
    color: "bg-orange-500",
  },
  {
    id: "stopwatch",
    name: "Stopwatch",
    description: "Track time with precision and lap times",
    icon: "⏱️",
    href: "/tools/stopwatch",
    color: "bg-cyan-500",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Analyze text and count words instantly",
    icon: "📊",
    href: "/tools/word-counter",
    color: "bg-indigo-500",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Quick calculations for everyday use",
    icon: "🔢",
    href: "/tools/calculator",
    color: "bg-teal-500",
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description: "Build consistency with daily habits",
    icon: "📅",
    href: "/tools/habit-tracker",
    color: "bg-lime-500",
  },
  {
    id: "countdown-timer",
    name: "Countdown Timer",
    description: "Countdown to your 100th birthday",
    icon: "⏰",
    href: "/tools/countdown-timer",
    color: "bg-rose-500",
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units",
    icon: "🔄",
    href: "/tools/unit-converter",
    color: "bg-violet-500",
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips and split bills",
    icon: "💸",
    href: "/tools/tip-calculator",
    color: "bg-emerald-500",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index",
    icon: "⚖️",
    href: "/tools/bmi-calculator",
    color: "bg-sky-500",
  },
  {
    id: "qr-generator",
    name: "QR Generator",
    description: "Generate QR codes from text",
    icon: "📲",
    href: "/tools/qr-generator",
    color: "bg-fuchsia-500",
  },
  {
    id: "color-palette",
    name: "Color Palette",
    description: "Generate beautiful color palettes",
    icon: "🎨",
    href: "/tools/color-palette",
    color: "bg-amber-500",
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    description: "Track your spending",
    icon: "💰",
    href: "/tools/expense-tracker",
    color: "bg-red-500",
  },
  {
    id: "exchange-rate",
    name: "Exchange Rate",
    description: "USD to TWD currency converter",
    icon: "💱",
    href: "/tools/exchange-rate",
    color: "bg-yellow-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <header className="mb-8 sm:mb-16 border-4 sm:border-8 border-black p-4 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ animation: 'slideInUp 0.6s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black mb-2 sm:mb-4 uppercase tracking-tight">
            Productivity Hub
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-black uppercase">
            Your Tools. Your Rules.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <Link
              key={tool.id}
              href={tool.href}
              className={`group relative block p-6 sm:p-8 border-4 sm:border-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] transition-all ${tool.color}`}
              style={{ animation: `slideInUp 0.6s ease-out ${0.1 * index}s backwards` }}
            >
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 group-hover:animate-[bounce_0.6s_ease-in-out]">{tool.icon}</div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-1 sm:mb-2 uppercase leading-tight">
                {tool.name}
              </h2>
              <p className="text-white font-bold text-sm sm:text-base leading-tight">{tool.description}</p>
            </Link>
          ))}
        </div>
        <footer className="text-center mt-8 sm:mt-16 border-t-2 sm:border-t-4 border-black pt-4 sm:pt-8" style={{ animation: 'fadeIn 1s ease-out 0.8s backwards' }}>
          <p className="font-black text-black uppercase tracking-wider">Built with Next.js</p>
        </footer>
      </div>
    </div>
  );
}
