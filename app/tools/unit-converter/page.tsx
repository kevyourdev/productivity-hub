"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type UnitType = "temperature" | "length" | "weight" | "volume";

const UNITS = {
  temperature: ["celsius", "fahrenheit", "kelvin"],
  length: ["meter", "feet", "inch", "mile", "kilometer"],
  weight: ["kilogram", "pound", "ounce", "gram"],
  volume: ["liter", "gallon", "cup", "milliliter"],
};

const UNIT_LABELS = {
  temperature: { celsius: "°C", fahrenheit: "°F", kelvin: "K" },
  length: { meter: "m", feet: "ft", inch: "in", mile: "mi", kilometer: "km" },
  weight: { kilogram: "kg", pound: "lb", ounce: "oz", gram: "g" },
  volume: { liter: "L", gallon: "gal", cup: "cup", milliliter: "mL" },
};

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>("temperature");
  const [fromUnit, setFromUnit] = useState<string>("celsius");
  const [toUnit, setToUnit] = useState<string>("fahrenheit");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || inputValue === "") {
      setResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      setResult(value);
      return;
    }

    let result = value;

    if (unitType === "temperature") {
      // Convert to Celsius first
      let celsius = value;
      if (fromUnit === "fahrenheit") {
        celsius = ((value - 32) * 5) / 9;
      } else if (fromUnit === "kelvin") {
        celsius = value - 273.15;
      }

      // Convert from Celsius to target
      if (toUnit === "fahrenheit") {
        result = (celsius * 9) / 5 + 32;
      } else if (toUnit === "kelvin") {
        result = celsius + 273.15;
      } else {
        result = celsius;
      }
    } else if (unitType === "length") {
      // Convert to meters first
      let meters = value;
      if (fromUnit === "feet") meters = value / 3.28084;
      else if (fromUnit === "inch") meters = value / 39.3701;
      else if (fromUnit === "mile") meters = value * 1609.34;
      else if (fromUnit === "kilometer") meters = value * 1000;

      // Convert from meters to target
      if (toUnit === "feet") result = meters * 3.28084;
      else if (toUnit === "inch") result = meters * 39.3701;
      else if (toUnit === "mile") result = meters / 1609.34;
      else if (toUnit === "kilometer") result = meters / 1000;
      else result = meters;
    } else if (unitType === "weight") {
      // Convert to kilograms first
      let kilograms = value;
      if (fromUnit === "pound") kilograms = value / 2.20462;
      else if (fromUnit === "ounce") kilograms = value / 35.274;
      else if (fromUnit === "gram") kilograms = value / 1000;

      // Convert from kilograms to target
      if (toUnit === "pound") result = kilograms * 2.20462;
      else if (toUnit === "ounce") result = kilograms * 35.274;
      else if (toUnit === "gram") result = kilograms * 1000;
      else result = kilograms;
    } else if (unitType === "volume") {
      // Convert to liters first
      let liters = value;
      if (fromUnit === "gallon") liters = value / 0.264172;
      else if (fromUnit === "cup") liters = value / 4.22675;
      else if (fromUnit === "milliliter") liters = value / 1000;

      // Convert from liters to target
      if (toUnit === "gallon") result = liters * 0.264172;
      else if (toUnit === "cup") result = liters * 4.22675;
      else if (toUnit === "milliliter") result = liters * 1000;
      else result = liters;
    }

    setResult(result);
  }, [inputValue, fromUnit, toUnit, unitType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (type: UnitType) => {
    setUnitType(type);
    if (type === "temperature") {
      setFromUnit("celsius");
      setToUnit("fahrenheit");
    } else if (type === "length") {
      setFromUnit("meter");
      setToUnit("feet");
    } else if (type === "weight") {
      setFromUnit("kilogram");
      setToUnit("pound");
    } else {
      setFromUnit("liter");
      setToUnit("gallon");
    }
    setInputValue("");
    setResult(null);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const units = UNITS[unitType];

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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Unit Converter</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Convert between different units instantly
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 justify-center">
          {(["temperature", "length", "weight", "volume"] as UnitType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`border-2 sm:border-4 border-black px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base transition-colors ${
                unitType === type
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <div className="flex-1 w-full">
              <label className="block text-lg sm:text-xl font-black uppercase mb-2">From</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="flex-1 border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase bg-white focus:outline-none focus:ring-4 focus:ring-black"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unitType][unit as keyof typeof UNIT_LABELS[typeof unitType]]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={swapUnits}
              className="border-4 border-black bg-black text-white p-3 sm:p-4 font-black uppercase text-lg sm:text-xl hover:bg-white hover:text-black transition-colors"
            >
              ⇄
            </button>

            <div className="flex-1 w-full">
              <label className="block text-lg sm:text-xl font-black uppercase mb-2">To</label>
              <div className="flex gap-2">
                <div className="flex-1 border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase bg-gray-100">
                  {result !== null ? result.toFixed(4).replace(/\.?0+$/, "") : "—"}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase bg-white focus:outline-none focus:ring-4 focus:ring-black"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unitType][unit as keyof typeof UNIT_LABELS[typeof unitType]]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {inputValue && result !== null && (
          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-purple-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-black text-white mb-2">
                {parseFloat(inputValue).toLocaleString()} {UNIT_LABELS[unitType][fromUnit as keyof typeof UNIT_LABELS[typeof unitType]]}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-2">=</div>
              <div className="text-3xl sm:text-5xl font-black text-white">
                {result.toFixed(4).replace(/\.?0+$/, "")} {UNIT_LABELS[unitType][toUnit as keyof typeof UNIT_LABELS[typeof unitType]]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

