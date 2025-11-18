"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type TimerMode = "work" | "shortBreak" | "longBreak";

const TIMER_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Pomodoro() {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "work") {
        setPomodorosCompleted((prev) => prev + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors mb-8"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h1 className="text-5xl font-black uppercase mb-4">Pomodoro Timer</h1>
          <p className="text-xl font-bold uppercase">
            Work in focused 25-minute intervals
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => switchMode("work")}
              className={`border-4 border-black px-6 py-3 font-black uppercase transition-colors ${
                mode === "work"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Work (25m)
            </button>
            <button
              onClick={() => switchMode("shortBreak")}
              className={`border-4 border-black px-6 py-3 font-black uppercase transition-colors ${
                mode === "shortBreak"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Break (5m)
            </button>
            <button
              onClick={() => switchMode("longBreak")}
              className={`border-4 border-black px-6 py-3 font-black uppercase transition-colors ${
                mode === "longBreak"
                  ? "bg-purple-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Long (15m)
            </button>
          </div>

          <div className="border-8 border-black p-16 bg-red-500 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-9xl font-black text-white tabular-nums">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={toggleTimer}
              className="bg-black text-white border-8 border-black px-16 py-6 text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="bg-white text-black border-8 border-black px-12 py-6 text-2xl font-black uppercase hover:bg-gray-200 transition-colors cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
            >
              Reset
            </button>
          </div>

          <div className="border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
            <div className="text-center">
              <div className="text-6xl mb-2">🍅</div>
              <div className="text-xl font-black uppercase mb-2">
                Pomodoros Completed
              </div>
              <div className="text-6xl font-black">{pomodorosCompleted}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
