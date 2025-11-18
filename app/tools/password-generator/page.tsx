"use client";

import { useState } from "react";
import Link from "next/link";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      alert("Please select at least one character type!");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Password Gen</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Create secure random passwords
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="w-full max-w-2xl border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-5 sm:mb-6">
              <label className="block text-lg sm:text-xl font-black uppercase mb-3 sm:mb-4">
                Length: {length}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-3 sm:h-4 border-2 sm:border-4 border-black appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, black ${((length - 8) / (64 - 8)) * 100}%, white ${((length - 8) / (64 - 8)) * 100}%)`,
                }}
              />
            </div>

            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              {[
                { label: "Uppercase (A-Z)", state: includeUppercase, setter: setIncludeUppercase },
                { label: "Lowercase (a-z)", state: includeLowercase, setter: setIncludeLowercase },
                { label: "Numbers (0-9)", state: includeNumbers, setter: setIncludeNumbers },
                { label: "Symbols (!@#$)", state: includeSymbols, setter: setIncludeSymbols },
              ].map((option, index) => (
                <label key={index} className="flex items-center gap-3 sm:gap-4 cursor-pointer group">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 border-2 sm:border-4 border-black flex items-center justify-center font-black text-lg sm:text-xl ${
                      option.state ? "bg-green-400" : "bg-white group-hover:bg-gray-100"
                    }`}
                  >
                    {option.state && "✓"}
                  </div>
                  <input
                    type="checkbox"
                    checked={option.state}
                    onChange={(e) => option.setter(e.target.checked)}
                    className="hidden"
                  />
                  <span className="text-base sm:text-lg font-bold uppercase">{option.label}</span>
                </label>
              ))}
            </div>

            <button
              onClick={generatePassword}
              className="w-full bg-black text-white border-4 sm:border-8 border-black px-6 py-5 sm:px-8 sm:py-6 text-xl sm:text-2xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
            >
              Generate
            </button>
          </div>

          {password && (
            <div className="w-full max-w-2xl">
              <div className="border-4 sm:border-8 border-black p-5 sm:p-6 bg-purple-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-3 sm:mb-4">
                <div className="text-lg sm:text-2xl font-mono font-bold break-all">
                  {password}
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className={`w-full border-4 sm:border-8 border-black px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-black uppercase transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] ${
                  copied
                    ? "bg-green-400 text-black"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
