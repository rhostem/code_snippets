import { useState, useEffect, useRef, useCallback } from 'react';

export const TIMELEFT_TEXT_BEFORE_START = '--:--';

type VoidCallback = () => void;

type HookReturns = {
  left: number;
  formatTimeLeft: () => string;
  startTimer: (limit: number, callback: VoidCallback) => void;
  resetTimer: VoidCallback;
};

const useTimeLeft = (): HookReturns => {
  const [left, setLeft] = useState<number>(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimerInterval();
    setLeft(-1);
  }, [clearTimerInterval]);

  const startTimer = useCallback(
    (limit: number, onTimeout: VoidCallback) => {
      resetTimer();

      if (limit > 0) {
        let timeLeft = limit;
        setLeft(timeLeft);

        timer.current = setInterval(() => {
          timeLeft -= 1;
          setLeft(timeLeft);

          if (timeLeft === 0 && onTimeout) {
            onTimeout();
            clearTimerInterval();
          }
        }, 1000);
      }
    },
    [clearTimerInterval, resetTimer]
  );

  useEffect(
    () => () => {
      // clear timer on unmount of component
      resetTimer();
    },
    [resetTimer]
  );

  const formatTimeLeft = useCallback(() => {
    const hour = Math.floor(left / 3600);
    const minute = Math.floor((left % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const second = (left % 60).toString().padStart(2, '0');

    return left >= 0
      ? `${hour > 0 ? `${hour}:` : ''}${minute}:${second}`
      : TIMELEFT_TEXT_BEFORE_START;
  }, [left]);

  return { left, startTimer, resetTimer, formatTimeLeft };
};

export default useTimeLeft;
