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
        className="absolute top-8 left-8 border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors"
      >
        ← Back
      </Link>
      {!isActive ? (
        <div className="flex flex-col items-center gap-8 max-w-2xl">
          <div className="border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-center text-2xl font-bold uppercase">
              Look at the dot & breathe for{" "}
              <select
                value={duration}
                onChange={handleDurationChange}
                className="border-4 border-black bg-yellow-300 px-2 py-1 font-black cursor-pointer uppercase"
              >
                <option value={30}>0.5 min</option>
                <option value={60}>1 min</option>
              </select>{" "}
              to improve focus
            </p>
          </div>
          <button
            onClick={handleStart}
            className="bg-black text-white border-8 border-black px-16 py-6 text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-80 h-80 bg-black border-8 border-black"
            style={{
              animation: 'breathe 4s ease-in-out infinite'
            }}
          ></div>
          <div className="mt-8 text-6xl font-black tabular-nums border-8 border-black px-8 py-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
