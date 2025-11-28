"use client";

import { useState } from "react";
import Link from "next/link";

export default function QRGenerator() {
  const [text, setText] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const generateQR = () => {
    if (!text.trim()) {
      setQrCodeUrl("");
      return;
    }
    // Using a free QR code API
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
    setQrCodeUrl(url);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.trim()) {
      generateQR();
    } else {
      setQrCodeUrl("");
    }
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    link.click();
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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">QR Code Generator</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Generate QR codes from text or URLs
          </p>
        </div>

        <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 sm:mb-8">
          <label className="block text-lg sm:text-xl font-black uppercase mb-3">
            Enter Text or URL
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type your text or URL here..."
            rows={4}
            className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black resize-none"
          />
        </div>

        {qrCodeUrl && (
          <div className="border-4 sm:border-8 border-black p-10 sm:p-16 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              <div className="border-4 sm:border-8 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-64 h-64 sm:w-80 sm:h-80"
                />
              </div>
              <button
                onClick={downloadQR}
                className="bg-black text-white border-4 sm:border-8 border-black px-10 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]"
              >
                Download QR Code
              </button>
            </div>
          </div>
        )}

        {!qrCodeUrl && (
          <div className="border-4 sm:border-8 border-black p-12 sm:p-16 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <div className="text-5xl sm:text-6xl mb-4">📱</div>
            <div className="text-xl sm:text-2xl font-black uppercase text-gray-400">
              Enter text above to generate QR code
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

