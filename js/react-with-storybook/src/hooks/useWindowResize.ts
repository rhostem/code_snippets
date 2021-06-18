import { useEffect, useCallback } from 'react';
import throttle from 'utils/throttle';

export default function useWindowResize(
  handleResize: () => void,
  { delay = 100, enabled = true, executeOnInit = false } = {}
) {
  const throttledCb = useCallback(
    throttle(delay, () => {
      handleResize();
    }),
    [handleResize]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener('resize', throttledCb);

      if (executeOnInit) {
        handleResize();
      }
    }
    return () => {
      window.removeEventListener('resize', throttledCb);
    };
  }, [throttledCb, enabled, executeOnInit, handleResize]);

  return undefined;
}
