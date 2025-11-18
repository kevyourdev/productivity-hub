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
    <div className="min-h-screen bg-white p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors mb-8"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h1 className="text-5xl font-black uppercase mb-4">Random Number</h1>
          <p className="text-xl font-bold uppercase">
            Generate random numbers instantly
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-2xl border-8 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xl font-black uppercase mb-2">
                  Minimum
                </label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  className="w-full border-4 border-black px-4 py-3 text-2xl font-black text-center focus:outline-none focus:bg-yellow-100"
                />
              </div>
              <div>
                <label className="block text-xl font-black uppercase mb-2">
                  Maximum
                </label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  className="w-full border-4 border-black px-4 py-3 text-2xl font-black text-center focus:outline-none focus:bg-yellow-100"
                />
              </div>
            </div>

            <button
              onClick={generateRandom}
              className="w-full bg-black text-white border-8 border-black px-8 py-6 text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
            >
              Generate
            </button>
          </div>

          {result !== null && (
            <div className="border-8 border-black p-16 bg-green-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-9xl font-black text-black">
                {result}
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="border-8 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-black uppercase">History</h2>
                  <button
                    onClick={clearHistory}
                    className="border-4 border-black bg-red-500 text-white px-4 py-2 font-black uppercase text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {history.map((num, index) => (
                    <div
                      key={index}
                      className="border-4 border-black px-6 py-3 bg-blue-400 font-black text-2xl"
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
