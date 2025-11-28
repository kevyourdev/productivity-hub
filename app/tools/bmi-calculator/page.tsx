"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (!height || !weight) {
      setBmi(null);
      setCategory("");
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBmi(null);
      setCategory("");
      return;
    }

    let bmiValue: number;
    if (unit === "metric") {
      // BMI = weight (kg) / height (m)²
      bmiValue = w / ((h / 100) ** 2);
    } else {
      // BMI = (weight (lbs) / height (in)²) × 703
      bmiValue = (w / (h ** 2)) * 703;
    }

    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Normal");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  }, [height, weight, unit]);

  const getCategoryColor = () => {
    if (!category) return "bg-gray-400";
    if (category === "Underweight") return "bg-blue-400";
    if (category === "Normal") return "bg-green-500";
    if (category === "Overweight") return "bg-yellow-500";
    return "bg-red-500";
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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">BMI Calculator</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Calculate your Body Mass Index
          </p>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 justify-center">
            <button
              onClick={() => {
                setUnit("metric");
                setHeight("");
                setWeight("");
              }}
              className={`border-2 sm:border-4 border-black px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base transition-colors ${
                unit === "metric"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => {
                setUnit("imperial");
                setHeight("");
                setWeight("");
              }}
              className={`border-2 sm:border-4 border-black px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base transition-colors ${
                unit === "imperial"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Imperial (lbs/in)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <label className="block text-lg sm:text-xl font-black uppercase mb-3">
                Height {unit === "metric" ? "(cm)" : "(inches)"}
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "175" : "70"}
                className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-lg sm:text-xl font-black uppercase mb-3">
                Weight {unit === "metric" ? "(kg)" : "(lbs)"}
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "70" : "154"}
                className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {bmi !== null && (
          <div className="border-4 sm:border-8 border-black p-10 sm:p-16 bg-gradient-to-br from-blue-500 to-purple-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center text-white">
              <div className="text-6xl sm:text-9xl font-black mb-4 sm:mb-6">
                {bmi.toFixed(1)}
              </div>
              <div className="text-2xl sm:text-3xl font-black uppercase mb-4 sm:mb-6">
                BMI
              </div>
              <div className={`inline-block border-4 sm:border-8 border-black px-8 py-4 sm:px-12 sm:py-6 ${getCategoryColor()} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}>
                <div className="text-2xl sm:text-4xl font-black uppercase text-white">
                  {category}
                </div>
              </div>
            </div>
          </div>
        )}

        {bmi === null && height === "" && weight === "" && (
          <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-5xl sm:text-6xl mb-4">💪</div>
            <div className="text-xl sm:text-2xl font-black uppercase text-gray-400">
              Enter your height and weight above
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

