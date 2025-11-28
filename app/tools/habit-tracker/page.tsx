"use client";

import { useState } from "react";
import Link from "next/link";

interface Habit {
  id: number;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompleted: string | null;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [inputValue, setInputValue] = useState("");

  const today = new Date().toDateString();

  const addHabit = () => {
    if (inputValue.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: inputValue.trim(),
          streak: 0,
          completedToday: false,
          lastCompleted: null,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const wasCompletedToday = habit.completedToday;
          const lastCompletedDate = habit.lastCompleted;

          if (wasCompletedToday) {
            return {
              ...habit,
              completedToday: false,
              streak: Math.max(0, habit.streak - 1),
            };
          } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const wasYesterday = lastCompletedDate === yesterday.toDateString();

            return {
              ...habit,
              completedToday: true,
              lastCompleted: today,
              streak: wasYesterday || habit.streak === 0 ? habit.streak + 1 : 1,
            };
          }
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;
  const longestStreak = habits.length > 0 ? Math.max(...habits.map((h) => h.streak)) : 0;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
        style={{ animation: 'slideInLeft 0.4s ease-out' }}
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Habit Tracker</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Build consistency daily
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Total Habits</div>
            <div className="text-4xl sm:text-5xl font-black">{totalHabits}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Done Today</div>
            <div className="text-4xl sm:text-5xl font-black">{completedToday}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Best Streak</div>
            <div className="text-4xl sm:text-5xl font-black">{longestStreak}</div>
          </div>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-black uppercase mb-4">Add New Habit</h2>
          <div className="flex gap-2 sm:gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addHabit()}
              placeholder="Exercise, read, meditate..."
              className="flex-1 border-2 sm:border-4 border-black p-3 sm:p-4 text-base sm:text-lg font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
            />
            <button
              onClick={addHabit}
              className="bg-black text-white border-2 sm:border-4 border-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase text-base sm:text-lg hover:bg-white hover:text-black transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {habits.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`border-4 sm:border-8 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  habit.completedToday ? "bg-green-400" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-2xl font-black uppercase mb-2">{habit.name}</h3>
                    <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-bold">
                      <span className="border-2 border-black px-2 py-1 bg-white">
                        🔥 {habit.streak} day{habit.streak !== 1 ? "s" : ""}
                      </span>
                      {habit.completedToday && (
                        <span className="border-2 border-black px-2 py-1 bg-yellow-300">
                          ✓ Done Today
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`border-2 sm:border-4 border-black px-4 sm:px-6 py-2 sm:py-3 font-black uppercase text-sm sm:text-base transition-colors ${
                        habit.completedToday
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {habit.completedToday ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="border-2 sm:border-4 border-black bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 font-black uppercase text-sm sm:text-base hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-4 sm:border-8 border-black p-8 sm:p-12 bg-gray-100 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xl sm:text-2xl font-black uppercase text-gray-600">
              No habits yet. Add one above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
