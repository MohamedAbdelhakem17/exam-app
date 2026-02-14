"use client";

export default function ExamTimer({
  remainingSeconds,
  totalSeconds,
}: {
  remainingSeconds: number;
  totalSeconds: number;
}) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const radius = 25;
  const cx = 32;
  const cy = 32;
  const circumference = 2 * Math.PI * radius;
  const safeTotalSeconds = totalSeconds > 0 ? totalSeconds : 1;
  const progress = remainingSeconds / safeTotalSeconds;
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
