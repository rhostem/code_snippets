import { useCallback, useEffect, useMemo } from 'react';
import { isFunction } from 'utils/typeCheck';

type Props = {
  onKeydown?: (e: KeyboardEvent) => void;
  on?: Record<string, () => void>; // 키 - 콜백 맵
  activate?: (() => boolean) | boolean;
};

const useKeyDown = ({ onKeydown, activate, on }: Props) => {
  const isActivated = useMemo(
    () =>
      typeof activate === 'function'
        ? activate()
        : typeof activate === 'boolean'
        ? activate
        : true,
    [activate]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (isFunction(onKeydown)) {
        onKeydown(e);
      }

      if (on) {
        Object.entries(on).forEach(([key, cb]) => {
          if (e.key === key) {
            cb();
          }
        });
      }
    },
    [on, onKeydown]
  );

  useEffect(() => {
    if (isActivated) {
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activate, handleKeydown, isActivated, onKeydown]);
};

export default useKeyDown;
