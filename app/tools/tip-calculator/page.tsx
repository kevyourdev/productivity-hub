"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("");
  const [tipPercent, setTipPercent] = useState<number>(20);
  const [numPeople, setNumPeople] = useState<number>(1);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [perPerson, setPerPerson] = useState<number>(0);

  useEffect(() => {
    const bill = parseFloat(billAmount) || 0;
    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;
    const perPersonAmount = numPeople > 0 ? total / numPeople : total;

    setTipAmount(tip);
    setTotalAmount(total);
    setPerPerson(perPersonAmount);
  }, [billAmount, tipPercent, numPeople]);

  const quickTipButtons = [10, 15, 18, 20, 25];

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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Tip Calculator</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Calculate tips and split bills easily
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <label className="block text-lg sm:text-xl font-black uppercase mb-3">
              Bill Amount ($)
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="0.00"
              className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
            />
          </div>

          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <label className="block text-lg sm:text-xl font-black uppercase mb-3">
              Number of People
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
            />
          </div>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <label className="block text-lg sm:text-xl font-black uppercase mb-4">
            Tip Percentage
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            {quickTipButtons.map((percent) => (
              <button
                key={percent}
                onClick={() => setTipPercent(percent)}
                className={`border-2 sm:border-4 border-black px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base transition-colors ${
                  tipPercent === percent
                    ? "bg-green-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value))}
            className="w-full h-4 sm:h-6 bg-gray-200 border-4 border-black"
          />
          <div className="text-center mt-2">
            <span className="text-2xl sm:text-3xl font-black">{tipPercent}%</span>
          </div>
        </div>

        <div className="border-4 sm:border-8 border-black p-10 sm:p-16 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-white">
            <div className="text-center">
              <div className="text-sm sm:text-base font-bold uppercase mb-2">Tip Amount</div>
              <div className="text-4xl sm:text-6xl font-black">${tipAmount.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-base font-bold uppercase mb-2">Total Amount</div>
              <div className="text-4xl sm:text-6xl font-black">${totalAmount.toFixed(2)}</div>
            </div>
            {numPeople > 1 && (
              <div className="text-center sm:col-span-2 border-t-4 border-white pt-6">
                <div className="text-sm sm:text-base font-bold uppercase mb-2">Per Person</div>
                <div className="text-5xl sm:text-7xl font-black">${perPerson.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

