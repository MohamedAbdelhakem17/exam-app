"use client";
import React, { useEffect, useState } from "react";

export default function ExamTimer({
  duration,
  examSubmit,
}: {
  duration: number;
  examSubmit: () => void;
}) {
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const saved = sessionStorage.getItem("examTime");
    return saved ? Number(saved) : duration * 60;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          examSubmit();
          return 0;
        }
        const updated = prev - 1;
        // sessionStorage.setItem("examTime", String(updated));
        return updated;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      sessionStorage.removeItem("examTime");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const radius = 25;
  const cx = 32;
  const cy = 32;
  const circumference = 2 * Math.PI * radius;
  const progress = remainingSeconds / (duration * 60);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          className="text-blue-100"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="5"
          r={radius}
          cy={cy}
          cx={cx}
        />
        <circle
          className="text-blue-600 transition-all duration-1000"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cy={cy}
          cx={cx}
        />
      </svg>
      <span className="absolute text-xs font-semibold">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
