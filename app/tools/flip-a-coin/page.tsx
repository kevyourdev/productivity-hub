"use client";

import { useState } from "react";
import Link from "next/link";

type CoinSide = "heads" | "tails" | null;

export default function FlipACoin() {
  const [result, setResult] = useState<CoinSide>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<CoinSide[]>([]);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const newResult: CoinSide = Math.random() < 0.5 ? "heads" : "tails";
      setResult(newResult);
      setHistory((prev) => [newResult, ...prev].slice(0, 10));
      setIsFlipping(false);
    }, 1000);
  };

  const resetHistory = () => {
    setHistory([]);
    setResult(null);
  };

  const headsCount = history.filter((r) => r === "heads").length;
  const tailsCount = history.filter((r) => r === "tails").length;

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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Flip a Coin</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Make decisions the old-fashioned way
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div
            className={`w-48 h-48 sm:w-64 sm:h-64 border-4 sm:border-8 border-black bg-yellow-400 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
              isFlipping ? "animate-spin" : ""
            }`}
            style={!isFlipping && !result ? { animation: 'pulse 2s ease-in-out infinite' } : undefined}
          >
            <div className="text-center">
              {isFlipping ? (
                <div className="text-5xl sm:text-6xl font-black">?</div>
              ) : result ? (
                <>
                  <div className="text-5xl sm:text-6xl mb-2" style={{ animation: 'bounce 0.6s ease-out' }}>
                    {result === "heads" ? "👑" : "🦅"}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black uppercase" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    {result}
                  </div>
                </>
              ) : (
                <div className="text-5xl sm:text-6xl">🪙</div>
              )}
            </div>
          </div>

          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="bg-black text-white border-4 sm:border-8 border-black px-12 py-5 sm:px-16 sm:py-6 text-xl sm:text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:disabled:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
          >
            {isFlipping ? "Flipping..." : "Flip Coin"}
          </button>

          {history.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-black uppercase">History</h2>
                  <button
                    onClick={resetHistory}
                    className="border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
                  >
                    Clear
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="border-2 sm:border-4 border-black p-3 sm:p-4 bg-blue-400">
                    <div className="text-base sm:text-xl font-black uppercase">Heads</div>
                    <div className="text-3xl sm:text-4xl font-black">{headsCount}</div>
                  </div>
                  <div className="border-2 sm:border-4 border-black p-3 sm:p-4 bg-red-400">
                    <div className="text-base sm:text-xl font-black uppercase">Tails</div>
                    <div className="text-3xl sm:text-4xl font-black">{tailsCount}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className={`border-2 sm:border-4 border-black px-2.5 py-1 sm:px-3 font-black uppercase text-xs sm:text-sm ${
                        item === "heads" ? "bg-blue-400" : "bg-red-400"
                      }`}
                    >
                      {item === "heads" ? "👑 H" : "🦅 T"}
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
