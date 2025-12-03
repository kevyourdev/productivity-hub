"use client";

import { useState } from "react";
import Link from "next/link";

export default function WordCounter() {
  const [text, setText] = useState("");

  const countWords = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const countCharacters = (str: string) => {
    return str.length;
  };

  const countCharactersNoSpaces = (str: string) => {
    return str.replace(/\s/g, "").length;
  };

  const countSentences = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return 0;
    return trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  };

  const countParagraphs = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  };

  const estimatedReadTime = (words: number) => {
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
  };

  const words = countWords(text);
  const characters = countCharacters(text);
  const charactersNoSpaces = countCharactersNoSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const readTime = estimatedReadTime(words);

  const handleClear = () => {
    setText("");
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

      <div className="max-w-6xl mx-auto">
        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8" style={{ animation: 'slideInUp 0.5s ease-out' }}>
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Word Counter</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Analyze your text instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Words</div>
            <div className="text-4xl sm:text-5xl font-black">{words}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Characters</div>
            <div className="text-4xl sm:text-5xl font-black">{characters}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">No Spaces</div>
            <div className="text-4xl sm:text-5xl font-black">{charactersNoSpaces}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-purple-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Sentences</div>
            <div className="text-4xl sm:text-5xl font-black">{sentences}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-pink-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Paragraphs</div>
            <div className="text-4xl sm:text-5xl font-black">{paragraphs}</div>
          </div>

          <div className="border-4 sm:border-8 border-black p-4 sm:p-6 bg-orange-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-base sm:text-xl font-black uppercase mb-2">Read Time</div>
            <div className="text-4xl sm:text-5xl font-black">{readTime}m</div>
          </div>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-black uppercase">Your Text</h2>
            <button
              onClick={handleClear}
              className="border-2 sm:border-4 border-black bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase text-xs sm:text-sm hover:bg-white hover:text-black transition-colors"
            >
              Clear
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="w-full h-64 sm:h-96 border-2 sm:border-4 border-black p-4 text-base sm:text-lg font-mono resize-none focus:outline-none focus:ring-4 focus:ring-black"
          />
        </div>
      </div>
    </div>
  );
}
