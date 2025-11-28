"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Lap {
  id: number;
  time: number;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([{ id: Date.now(), time }, ...laps]);
    }
  };

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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Stopwatch</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Track time with precision
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="border-4 sm:border-8 border-black p-8 sm:p-12 bg-blue-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-5xl sm:text-7xl font-black text-white font-mono tracking-tight">
              {formatTime(time)}
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
            <button
              onClick={handleStartStop}
              className={`border-4 sm:border-8 border-black px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-2xl font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] ${
                isRunning ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {isRunning ? "Stop" : "Start"}
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="bg-yellow-400 text-black border-4 sm:border-8 border-black px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-2xl font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              Lap
            </button>

            <button
              onClick={handleReset}
              className="bg-white text-black border-4 sm:border-8 border-black px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-2xl font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] hover:bg-black hover:text-white"
            >
              Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-xl sm:text-2xl font-black uppercase mb-4">Laps</h2>
                <div className="space-y-2">
                  {laps.map((lap, index) => (
                    <div
                      key={lap.id}
                      className="flex justify-between items-center border-2 sm:border-4 border-black p-3 sm:p-4 bg-gray-100"
                    >
                      <span className="font-black text-base sm:text-lg">Lap {laps.length - index}</span>
                      <span className="font-mono font-black text-base sm:text-lg">{formatTime(lap.time)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
