"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function OneMinuteFocus() {
  const [duration, setDuration] = useState<number>(60);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);
    if (!isActive) {
      setTimeLeft(newDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ← Back to Hub
      </Link>
      {!isActive ? (
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-lg max-w-md px-4">
            Look at the dot & breathe for just{" "}
            <select
              value={duration}
              onChange={handleDurationChange}
              className="underline cursor-pointer bg-transparent border-none outline-none"
            >
              <option value={30}>0.5 min</option>
              <option value={60}>1 min</option>
            </select>{" "}
            to improve mental focus for your next task
          </p>
          <button
            onClick={handleStart}
            className="bg-black text-white px-12 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-80 h-80 bg-black rounded-full"
            style={{
              animation: 'breathe 4s ease-in-out infinite'
            }}
          ></div>
          <div className="mt-8 text-3xl font-light tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
