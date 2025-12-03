"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

interface ExchangeRates {
  USD: number;
  JPY: number;
  EUR: number;
  CNY: number;
  CAD: number;
}

interface ConversionHistory {
  amount: number;
  twd: number;
  rate: number;
  currency: string;
  timestamp: Date;
}

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", color: "bg-blue-500" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", color: "bg-red-500" },
  { code: "EUR", name: "Euro", flag: "🇪🇺", color: "bg-blue-600" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", color: "bg-red-600" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", color: "bg-red-400" },
];

export default function ExchangeRate() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState<string>("1");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      autoAnimate(historyRef.current);
    }
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/TWD");
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      const data = await response.json();

      setExchangeRates({
        USD: 1 / data.rates.USD,
        JPY: 1 / data.rates.JPY,
        EUR: 1 / data.rates.EUR,
        CNY: 1 / data.rates.CNY,
        CAD: 1 / data.rates.CAD,
      });
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const calculateTWD = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || !exchangeRates) return 0;
    return inputAmount * exchangeRates[selectedCurrency as keyof ExchangeRates];
  };

  const addToHistory = () => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || !exchangeRates) return;

    const newEntry: ConversionHistory = {
      amount: inputAmount,
      twd: inputAmount * exchangeRates[selectedCurrency as keyof ExchangeRates],
      rate: exchangeRates[selectedCurrency as keyof ExchangeRates],
      currency: selectedCurrency,
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

      <div className="max-w-6xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-12 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 uppercase">
            💱 Exchange Rate
          </h1>
          <p className="text-base sm:text-xl font-bold uppercase mb-6 sm:mb-8">
            Currency to TWD Converter
          </p>

          {loading && (
            <div className="text-lg sm:text-2xl font-bold uppercase mb-4 sm:mb-6 animate-loading">
              💱 Loading exchange rates...
            </div>
          )}

          {error && (
            <div className="border-4 border-black bg-red-500 p-4 sm:p-6 mb-4 sm:mb-6">
              <p className="font-bold text-white uppercase">{error}</p>
            </div>
          )}

          {exchangeRates && !loading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {currencies.map((currency) => (
                  <div
                    key={currency.code}
                    className="border-4 border-black p-3 sm:p-4 bg-green-400"
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{currency.flag}</div>
                    <div className="text-xs sm:text-sm font-bold uppercase mb-1">
                      1 {currency.code}
                    </div>
                    <div className="text-base sm:text-xl font-black">
                      {exchangeRates[currency.code as keyof ExchangeRates].toFixed(4)}
                    </div>
                    <div className="text-xs font-bold uppercase opacity-75">TWD</div>
                  </div>
                ))}
              </div>

              {lastUpdated && (
                <div className="text-xs sm:text-sm font-bold uppercase mb-6 sm:mb-8 text-center opacity-75">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}

              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-xl font-black uppercase mb-3 sm:mb-4">
                  Select Currency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency.code)}
                      className={`border-4 border-black p-3 sm:p-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                        selectedCurrency === currency.code
                          ? currency.color + " text-white"
                          : "bg-white"
                      }`}
                    >
                      <div className="text-2xl mb-1">{currency.flag}</div>
                      <div className="text-sm sm:text-base">{currency.code}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className="block text-base sm:text-xl font-black uppercase mb-3 sm:mb-4">
                    {selectedCurrency} Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border-4 border-black p-3 sm:p-4 text-xl sm:text-3xl font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder={`Enter ${selectedCurrency} amount`}
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
                  disabled={isNaN(parseFloat(amount))}
                >
                  Save to History
                </button>
                <button
                  onClick={fetchExchangeRates}
                  className="border-4 border-black bg-purple-500 text-white px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Refresh Rates
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
            <div ref={historyRef} className="space-y-3 sm:space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border-4 border-black p-3 sm:p-4 bg-gray-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="font-bold text-sm sm:text-lg">
                      <span className="font-black">{item.amount.toFixed(2)} {item.currency}</span>
                      {" → "}
                      <span className="font-black">{item.twd.toFixed(2)} TWD</span>
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
