"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
      const newResults: number[] = [];
      for (let i = 0; i < numDice; i++) {
        newResults.push(Math.floor(Math.random() * sides) + 1);
      }
      setResults(newResults);
      setTotal(newResults.reduce((a, b) => a + b, 0));
      setRolling(false);
    }, 500);
  };

  const dicePresets = [
    { sides: 4, label: "D4", emoji: "🔺" },
    { sides: 6, label: "D6", emoji: "🎲" },
    { sides: 8, label: "D8", emoji: "🔷" },
    { sides: 10, label: "D10", emoji: "🔟" },
    { sides: 12, label: "D12", emoji: "🔵" },
    { sides: 20, label: "D20", emoji: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Dice Roller</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Roll dice for games and decisions
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="w-full max-w-2xl border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-5 sm:mb-6">
              <label className="block text-base sm:text-xl font-black uppercase mb-2">
                Number of Dice: {numDice}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={numDice}
                onChange={(e) => setNumDice(parseInt(e.target.value))}
                className="w-full h-3 sm:h-4 border-2 sm:border-4 border-black"
              />
            </div>

            <div className="mb-5 sm:mb-6">
              <label className="block text-base sm:text-xl font-black uppercase mb-2 sm:mb-3">
                Dice Type
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {dicePresets.map((preset) => (
                  <button
                    key={preset.sides}
                    onClick={() => setSides(preset.sides)}
                    className={`border-2 sm:border-4 border-black p-3 sm:p-4 font-black uppercase transition-colors ${
                      sides === preset.sides
                        ? "bg-blue-400 text-white"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl mb-1">{preset.emoji}</div>
                    <div className="text-xs sm:text-sm">{preset.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={rollDice}
              disabled={rolling}
              className="w-full bg-black text-white border-4 sm:border-8 border-black px-6 py-5 sm:px-8 sm:py-6 text-xl sm:text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
            >
              {rolling ? "Rolling..." : "Roll Dice"}
            </button>
          </div>

          {results.length > 0 && (
            <>
              <div className="border-4 sm:border-8 border-black p-10 sm:p-12 bg-red-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs sm:text-sm font-black uppercase mb-2 text-white">
                  Total
                </div>
                <div className="text-6xl sm:text-8xl font-black text-white">{total}</div>
              </div>

              <div className="w-full max-w-2xl">
                <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4">
                    Individual Rolls
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="border-2 sm:border-4 border-black px-6 py-4 sm:px-8 sm:py-6 bg-yellow-400 font-black text-3xl sm:text-4xl"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
