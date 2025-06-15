
import { useEffect, useState, useCallback } from "react";

interface UseProgressTimerProps {
  isActive: boolean;
  initialProgress?: number;
  increment?: number;
  interval?: number;
  maxProgress?: number;
}

export const useProgressTimer = ({
  isActive,
  initialProgress = 10,
  increment = 2,
  interval = 1000,
  maxProgress = 95
}: UseProgressTimerProps) => {
  const [progress, setProgress] = useState(initialProgress);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [initialProgress]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    setProgress(initialProgress);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= maxProgress) {
          return maxProgress;
        }
        return prev + increment;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isActive, initialProgress, increment, interval, maxProgress]);

  return { progress, resetProgress };
};
