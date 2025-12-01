"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ConversionHistory {
  usd: number;
  twd: number;
  rate: number;
  timestamp: Date;
}

export default function ExchangeRate() {
  const [usdAmount, setUsdAmount] = useState<string>("1");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      if (!response.ok) throw new Error("Failed to fetch exchange rate");
      const data = await response.json();
      setExchangeRate(data.rates.TWD);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch exchange rate. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const calculateTWD = () => {
    const usd = parseFloat(usdAmount);
    if (isNaN(usd) || !exchangeRate) return 0;
    return usd * exchangeRate;
  };

  const addToHistory = () => {
    const usd = parseFloat(usdAmount);
    if (isNaN(usd) || !exchangeRate) return;

    const newEntry: ConversionHistory = {
      usd,
      twd: usd * exchangeRate,
      rate: exchangeRate,
      timestamp: new Date(),
    };

    setHistory((prev) => [newEntry, ...prev].slice(0, 10));
  };

  const twdAmount = calculateTWD();

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block mb-4 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 border-4 border-black bg-white font-black uppercase text-sm sm:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
      >
        ← Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-12 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 uppercase">
            💱 Exchange Rate
          </h1>
          <p className="text-base sm:text-xl font-bold uppercase mb-6 sm:mb-8">
            USD to TWD Currency Converter
          </p>

          {loading && (
            <div className="text-lg sm:text-2xl font-bold uppercase mb-4 sm:mb-6">
              Loading exchange rate...
            </div>
          )}

          {error && (
            <div className="border-4 border-black bg-red-500 p-4 sm:p-6 mb-4 sm:mb-6">
              <p className="font-bold text-white uppercase">{error}</p>
            </div>
          )}

          {exchangeRate && !loading && (
            <>
              <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-green-400 mb-6 sm:mb-8">
                <div className="text-sm sm:text-base font-bold uppercase mb-2">
                  Current Rate
                </div>
                <div className="text-3xl sm:text-5xl font-black">
                  1 USD = {exchangeRate.toFixed(4)} TWD
                </div>
                {lastUpdated && (
                  <div className="text-xs sm:text-sm font-bold uppercase mt-2 opacity-75">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className="block text-base sm:text-xl font-black uppercase mb-3 sm:mb-4">
                    USD Amount
                  </label>
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="w-full border-4 border-black p-3 sm:p-4 text-xl sm:text-3xl font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="Enter USD amount"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-base sm:text-xl font-black uppercase mb-3 sm:mb-4">
                    TWD Amount
                  </label>
                  <div className="border-4 border-black p-3 sm:p-4 bg-yellow-300">
                    <div className="text-xl sm:text-3xl font-black">
                      {twdAmount.toFixed(2)} TWD
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={addToHistory}
                  className="flex-1 border-4 border-black bg-blue-500 text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isNaN(parseFloat(usdAmount))}
                >
                  Save to History
                </button>
                <button
                  onClick={fetchExchangeRate}
                  className="border-4 border-black bg-purple-500 text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Refresh Rate
                </button>
              </div>
            </>
          )}
        </div>

        {history.length > 0 && (
          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-3xl font-black uppercase">
                Conversion History
              </h2>
              <button
                onClick={() => setHistory([])}
                className="border-4 border-black bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Clear
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border-4 border-black p-3 sm:p-4 bg-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="font-bold text-sm sm:text-lg">
                      <span className="font-black">${item.usd.toFixed(2)} USD</span>
                      {" → "}
                      <span className="font-black">${item.twd.toFixed(2)} TWD</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold uppercase opacity-75">
                      Rate: {item.rate.toFixed(4)} | {item.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
