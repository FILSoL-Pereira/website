"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatTime = (value: number) => String(value).padStart(2, "0");

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
    };

    updateCountdown(); 

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="text-center text-white">Cargando...</div>;
  }

  const isTimeUp =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div className="relative text-center bg-amber-500 py-5 px-2 sm:px-6 z-10">
      {!isTimeUp ? (
        <>
          <p className="text-white text-xl sm:text-3xl font-bold mb-4">
            El evento inicia en:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-2xl font-bold">
            <div className="bg-white text-amber-600 rounded-lg shadow-md px-4 py-2 w-20">
              <span className="block text-3xl">
                {formatTime(timeLeft.days)}
              </span>
              <span className="text-sm font-medium">Días</span>
            </div>
            <div className="bg-white text-amber-600 rounded-lg shadow-md px-4 py-2 w-20">
              <span className="block text-3xl">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-sm font-medium">Horas</span>
            </div>
            <div className="bg-white text-amber-600 rounded-lg shadow-md px-4 py-2 w-20">
              <span className="block text-3xl">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-sm font-medium">Min</span>
            </div>
            <div className="bg-white text-amber-600 rounded-lg shadow-md px-4 py-2 w-20">
              <span className="block text-3xl">
                {formatTime(timeLeft.seconds)}
              </span>
              <span className="text-sm font-medium">Seg</span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white text-4xl font-semibold animate-bounce">
          ¡El evento ha comenzado! 🎉
        </p>
      )}
    </div>
  );
}
