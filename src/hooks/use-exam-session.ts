"use client";

import { useEffect, useState } from "react";

enum SESSION_KEYS {
  index = "currentIndex",
  isExamComplete = "isExamComplete",
  timer = "timer",
}

export function useExamSession({ timerDuration }: { timerDuration: number }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isExamComplete, setIsExamComplete] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(timerDuration);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from sessionStorage once
  useEffect(() => {
    const storedIndex = sessionStorage.getItem(SESSION_KEYS.index);
    const storedStatus = sessionStorage.getItem(SESSION_KEYS.isExamComplete);
    const storedTimer = sessionStorage.getItem(SESSION_KEYS.timer);

    if (storedIndex !== null) setCurrentIndex(Number(storedIndex));
    if (storedStatus !== null) setIsExamComplete(JSON.parse(storedStatus));
    if (storedTimer !== null) {
      const parsedTimer = Number(storedTimer);
      setTimer(Number.isNaN(parsedTimer) ? timerDuration : parsedTimer);
    }

    setIsLoaded(true);
  }, []);

  // Persist changes
  useEffect(() => {
    if (!isLoaded) return;
    sessionStorage.setItem(SESSION_KEYS.index, String(currentIndex));
  }, [currentIndex, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    sessionStorage.setItem(
      SESSION_KEYS.isExamComplete,
      JSON.stringify(isExamComplete),
    );
  }, [isExamComplete, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    sessionStorage.setItem(SESSION_KEYS.timer, String(timer));
  }, [timer, isLoaded]);

  useEffect(() => {
    if (!isLoaded || isExamComplete || timer <= 0) return;

    const intervalId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLoaded, isExamComplete, timer]);

  const resetExam = () => {
    setIsExamComplete(false);
    setTimer(timerDuration);
    sessionStorage.clear();
  };

  return {
    currentIndex,
    setCurrentIndex,
    isExamComplete,
    setIsExamComplete,
    timer,
    setTimer,
    resetExam,
    isLoaded,
  };
}
