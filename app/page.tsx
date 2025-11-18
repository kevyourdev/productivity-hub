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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-16 border-8 border-black p-8 bg-white">
          <h1 className="text-6xl font-black text-black mb-4 uppercase tracking-tight">
            Productivity Hub
          </h1>
          <p className="text-2xl font-bold text-black uppercase">
            Your Tools. Your Rules.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.comingSoon ? "#" : tool.href}
              className={`group relative block p-8 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all ${
                tool.color
              } ${tool.comingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 bg-white border-4 border-black text-black text-xs font-black px-3 py-1 uppercase">
                  Soon
                </div>
              )}
              <div className="text-6xl mb-4">{tool.icon}</div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase">
                {tool.name}
              </h2>
              <p className="text-white font-bold">{tool.description}</p>
            </Link>
          ))}
        </div>
        <footer className="text-center mt-16 border-t-4 border-black pt-8">
          <p className="font-black text-black uppercase tracking-wider">Built with Next.js</p>
        </footer>
      </div>
    </div>
  );
}
