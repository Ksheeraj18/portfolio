import { useEffect, useMemo, useRef } from 'react';

const STORAGE_KEY = 'portfolio_perf_mode';

export default function usePerformanceMode() {
  const prefersReducedMotionRef = useRef(false);
  const userOverrideRef = useRef(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'low' || stored === 'medium' || stored === 'high') {
      userOverrideRef.current = stored;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => prefersReducedMotionRef.current = mediaQuery.matches;
    handleChange();
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  const baseMode = useMemo(() => {
    if (prefersReducedMotionRef.current) return 'low';

    const deviceMemory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    if (deviceMemory <= 4 || cores <= 4) return 'low';
    if (deviceMemory <= 8 || cores <= 6) return 'medium';
    return 'high';
  }, []);

  const mode = userOverrideRef.current || baseMode;

  const setMode = (value) => {
    if (!['low', 'medium', 'high'].includes(value)) return;
    userOverrideRef.current = value;
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  return {
    mode,
    setMode,
    isLow: mode === 'low',
    isMedium: mode === 'medium',
    isHigh: mode === 'high',
    baseMode,
  };
}
