"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CountdownTimer() {
  // Calculate birthdate assuming user is 25 years old today
  // This will be their birthdate 25 years ago
  const getDefaultBirthdate = () => {
    const today = new Date();
    const birthYear = today.getFullYear() - 25;
    return `${birthYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const [birthdate, setBirthdate] = useState(getDefaultBirthdate());
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const birthDate = new Date(birthdate);
      const hundredthBirthday = new Date(birthDate);
      hundredthBirthday.setFullYear(birthDate.getFullYear() + 100);

      const now = new Date();
      const difference = hundredthBirthday.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDaysLeft(days);
        setHoursLeft(hours);
        setMinutesLeft(minutes);
        setSecondsLeft(seconds);
      } else {
        setDaysLeft(0);
        setHoursLeft(0);
        setMinutesLeft(0);
        setSecondsLeft(0);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [birthdate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
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
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-3 sm:mb-4">Countdown to 100</h1>
          <p className="text-base sm:text-xl font-bold uppercase">
            Days until your 100th birthday
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
            <label className="block text-lg sm:text-xl font-black uppercase mb-3">
              Your Birthdate
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full border-4 border-black p-3 sm:p-4 text-lg sm:text-xl font-bold uppercase focus:outline-none focus:ring-4 focus:ring-black"
            />
          </div>

          <div className="border-4 sm:border-8 border-black p-10 sm:p-16 bg-gradient-to-br from-purple-500 to-pink-500 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl">
            <div className="text-center">
              <div className="text-6xl sm:text-9xl font-black text-white tabular-nums mb-4 sm:mb-6">
                {daysLeft.toLocaleString()}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white uppercase mb-6 sm:mb-8">
                Days
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 text-white">
                <div>
                  <div className="text-3xl sm:text-5xl font-black tabular-nums mb-2">
                    {formatNumber(hoursLeft)}
                  </div>
                  <div className="text-sm sm:text-base font-bold uppercase">Hours</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-5xl font-black tabular-nums mb-2">
                    {formatNumber(minutesLeft)}
                  </div>
                  <div className="text-sm sm:text-base font-bold uppercase">Minutes</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-5xl font-black tabular-nums mb-2">
                    {formatNumber(secondsLeft)}
                  </div>
                  <div className="text-sm sm:text-base font-bold uppercase">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-4 sm:border-8 border-black p-6 sm:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-2">🎂</div>
              <div className="text-lg sm:text-xl font-black uppercase mb-2">
                Until You Turn 100
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-700">
                Make every day count!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

