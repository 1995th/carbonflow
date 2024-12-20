import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  enabled?: boolean;
}

export function useInfiniteScroll(
  callback: () => void,
  { threshold = 100, enabled = true }: UseInfiniteScrollOptions = {}
) {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching) {
        setIsFetching(true);
        callback();
      }
    }, options);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, threshold, isFetching, enabled]);

  useEffect(() => {
    if (targetRef.current && observerRef.current) {
      observerRef.current.observe(targetRef.current);
    }
  }, [targetRef.current]);

  const setTarget = (element: HTMLDivElement | null) => {
    targetRef.current = element;
  };

  return { setTarget, isFetching, setIsFetching };
}