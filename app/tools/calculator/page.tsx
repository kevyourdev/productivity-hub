"use client";

import { useState } from "react";
import Link from "next/link";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue !== null && operation && !newNumber) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const buttons = [
    { label: "C", action: handleClear, color: "bg-red-500" },
    { label: "←", action: handleBackspace, color: "bg-orange-400" },
    { label: "÷", action: () => handleOperation("÷"), color: "bg-blue-400" },
    { label: "×", action: () => handleOperation("×"), color: "bg-blue-400" },
    { label: "7", action: () => handleNumber("7"), color: "bg-white" },
    { label: "8", action: () => handleNumber("8"), color: "bg-white" },
    { label: "9", action: () => handleNumber("9"), color: "bg-white" },
    { label: "-", action: () => handleOperation("-"), color: "bg-blue-400" },
    { label: "4", action: () => handleNumber("4"), color: "bg-white" },
    { label: "5", action: () => handleNumber("5"), color: "bg-white" },
    { label: "6", action: () => handleNumber("6"), color: "bg-white" },
    { label: "+", action: () => handleOperation("+"), color: "bg-blue-400" },
    { label: "1", action: () => handleNumber("1"), color: "bg-white" },
    { label: "2", action: () => handleNumber("2"), color: "bg-white" },
    { label: "3", action: () => handleNumber("3"), color: "bg-white" },
    { label: "=", action: handleEquals, color: "bg-green-500", span: "row-span-2" },
    { label: "0", action: () => handleNumber("0"), color: "bg-white", span: "col-span-2" },
    { label: ".", action: handleDecimal, color: "bg-white" },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <Link
        href="/"
        className="inline-block border-4 border-black bg-white px-3 py-2 sm:px-4 font-black uppercase text-xs sm:text-sm hover:bg-black hover:text-white transition-colors mb-6 sm:mb-8"
        style={{ animation: 'slideInLeft 0.4s ease-out' }}
      >
        ← Back
      </Link>

      <div className="max-w-md mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Calculator</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Quick calculations
          </p>
        </div>

        <div className="border-4 sm:border-8 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-4 sm:border-b-8 border-black bg-gray-900 p-6 sm:p-8">
            <div className="text-right text-3xl sm:text-5xl font-black text-white font-mono break-all">
              {display}
            </div>
            {operation && (
              <div className="text-right text-base sm:text-xl font-black text-gray-400 mt-2">
                {previousValue} {operation}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-0 p-4 sm:p-6">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`${button.color} ${button.span || ""} border-2 sm:border-4 border-black p-4 sm:p-6 text-xl sm:text-3xl font-black hover:opacity-80 transition-opacity active:scale-95`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
