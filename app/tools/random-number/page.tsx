"use client";

import { useState } from "react";
import Link from "next/link";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const generateRandom = () => {
    const minNum = Math.min(min, max);
    const maxNum = Math.max(min, max);
    const random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    setResult(random);
    setHistory([random, ...history].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Random Number</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Generate random numbers instantly
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="w-full max-w-2xl border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-base sm:text-xl font-black uppercase mb-2">
                  Minimum
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full border-2 sm:border-4 border-black px-3 py-2 sm:px-4 sm:py-3 text-xl sm:text-2xl font-black text-center focus:outline-none focus:bg-yellow-100"
                />
              </div>
              <div>
                <label className="block text-base sm:text-xl font-black uppercase mb-2">
                  Maximum
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="w-full border-2 sm:border-4 border-black px-3 py-2 sm:px-4 sm:py-3 text-xl sm:text-2xl font-black text-center focus:outline-none focus:bg-yellow-100"
                />
              </div>
            </div>

            <button
              onClick={generateRandom}
              className="w-full bg-black text-white border-4 sm:border-8 border-black px-6 py-5 sm:px-8 sm:py-6 text-xl sm:text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
            >
              Generate
            </button>
          </div>

          {result !== null && (
            <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-green-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-7xl sm:text-9xl font-black text-black">
                {result}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-black uppercase">History</h2>
                  <button
                    onClick={clearHistory}
                    className="border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {history.map((num, index) => (
                    <div
                      key={index}
                      className="border-2 sm:border-4 border-black px-4 py-2 sm:px-6 sm:py-3 bg-blue-400 font-black text-xl sm:text-2xl"
                    >
                      {num}
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
