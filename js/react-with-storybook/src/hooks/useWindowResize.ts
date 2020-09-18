import { useEffect } from 'react';

export default function useWindowResize(handleResize: () => void) {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return undefined;
}
