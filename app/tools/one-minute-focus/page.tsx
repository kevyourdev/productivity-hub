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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative px-4 sm:px-0">
      <Link
        href="/"
        className="absolute top-4 left-4 sm:top-8 sm:left-8 border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors"
      >
        ← Back
      </Link>
      {!isActive ? (
        <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-2xl w-full">
          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-center text-lg sm:text-2xl font-bold uppercase">
              Look at the dot & breathe for{" "}
              <select
                value={duration}
                onChange={handleDurationChange}
                className="border-2 sm:border-4 border-black bg-yellow-300 px-2 py-1 font-black cursor-pointer uppercase text-base sm:text-xl"
              >
                <option value={30}>0.5 min</option>
                <option value={60}>1 min</option>
              </select>{" "}
              to improve focus
            </p>
          </div>
          <button
            onClick={handleStart}
            className="bg-black text-white border-4 sm:border-8 border-black px-12 py-5 sm:px-16 sm:py-6 text-xl sm:text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-48 h-48 sm:w-80 sm:h-80 bg-black border-4 sm:border-8 border-black"
            style={{
              animation: 'breathe 4s ease-in-out infinite'
            }}
          ></div>
          <div className="mt-6 sm:mt-8 text-5xl sm:text-6xl font-black tabular-nums border-4 sm:border-8 border-black px-6 py-3 sm:px-8 sm:py-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
