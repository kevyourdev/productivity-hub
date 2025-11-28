"use client";

import { useState } from "react";
import Link from "next/link";

export default function ColorPalette() {
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const colors: string[] = [];
    for (let i = 0; i < 5; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 60 + Math.floor(Math.random() * 40);
      const lightness = 40 + Math.floor(Math.random() * 30);
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    setPalette(colors);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    // Visual feedback could be added here
  };

  const hexToRgb = (hsl: string) => {
    // Convert HSL to RGB for display
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return "";
    
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Color Palette</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Generate beautiful color palettes
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <button
            onClick={generatePalette}
            className="w-full bg-black text-white border-4 sm:border-8 border-black px-10 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
          >
            Generate New Palette
          </button>
        </div>

        {palette.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6">
            {palette.map((color, index) => {
              const hex = hexToRgb(color);
              return (
                <div
                  key={index}
                  className="border-4 sm:border-8 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] transition-all"
                  onClick={() => copyToClipboard(hex)}
                >
                  <div
                    className="h-32 sm:h-48 w-full"
                    style={{ backgroundColor: color }}
                  />
                  <div className="bg-white p-3 sm:p-4 border-t-4 border-black">
                    <div className="text-xs sm:text-sm font-black uppercase mb-1">
                      {hex}
                    </div>
                    <div className="text-xs font-bold text-gray-600">
                      {color}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-5xl sm:text-6xl mb-4">🎨</div>
            <div className="text-xl sm:text-2xl font-black uppercase text-gray-400">
              Click above to generate a palette
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

