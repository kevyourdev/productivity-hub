import Link from "next/link";

const tools = [
  {
    id: "one-minute-focus",
    name: "One Minute Focus",
    description: "Improve mental focus through brief breathing exercises",
    icon: "🎯",
    href: "/tools/one-minute-focus",
    color: "bg-gradient-to-br from-gray-900 to-gray-700",
  },
  {
    id: "pomodoro",
    name: "Pomodoro Timer",
    description: "Time management using the Pomodoro Technique",
    icon: "🍅",
    href: "/tools/pomodoro",
    color: "bg-gradient-to-br from-red-500 to-red-700",
    comingSoon: true,
  },
  {
    id: "todo",
    name: "To-Do List",
    description: "Simple and effective task management",
    icon: "✅",
    href: "/tools/todo",
    color: "bg-gradient-to-br from-blue-500 to-blue-700",
    comingSoon: true,
  },
  {
    id: "notes",
    name: "Quick Notes",
    description: "Capture your thoughts instantly",
    icon: "📝",
    href: "/tools/notes",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Productivity Hub
          </h1>
          <p className="text-xl text-gray-600">
            Your personal collection of productivity tools
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.comingSoon ? "#" : tool.href}
              className={`group relative block p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                tool.color
              } ${tool.comingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {tool.comingSoon && (
                <div className="absolute top-4 right-4 bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                  Coming Soon
                </div>
              )}
              <div className="text-6xl mb-4">{tool.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {tool.name}
              </h2>
              <p className="text-gray-100">{tool.description}</p>
            </Link>
          ))}
        </div>
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>Built with Next.js • Open Source</p>
        </footer>
      </div>
    </div>
  );
}
