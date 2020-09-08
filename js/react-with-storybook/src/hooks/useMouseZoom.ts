import {
  useState, useCallback, useMemo, useRef,
} from 'react';

export default function useMouseZoom({ imageWrapperRef }: { imageWrapperRef: React.RefObject<HTMLDivElement> }) {
  const [isMouseEventActive, setIsMouseEventActive] = useState(false);
  const initialPos = useRef({ x: 0, y: 0 });
  const [distance, setDistance] = useState({ x: 0, y: 0 });
  const lastDistance = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [zoomedWrapperSize, setZoomedWrapperSize] = useState({ width: 0, height: 0 });
  const isPanEnabled = useMemo(() => isMouseEventActive && zoom > 1, [isMouseEventActive, zoom]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isPanEnabled && imageWrapperRef.current) {
        const { width: originalWidth, height: originalHeight } = imageWrapperRef.current.getBoundingClientRect();

        const maxPanX = (zoomedWrapperSize.width - originalWidth) / 2;
        const maxPanY = (zoomedWrapperSize.height - originalHeight) / 2;

        let nextPanX = initialPos.current.x - e.clientX + lastDistance.current.x;
        let nextPanY = initialPos.current.y - e.clientY + lastDistance.current.y;

        nextPanX = nextPanX > 0 ? Math.min(maxPanX, nextPanX) : Math.max(-1 * maxPanX, nextPanX);
        nextPanY = nextPanY > 0 ? Math.min(maxPanY, nextPanY) : Math.max(-1 * maxPanY, nextPanY);

        setDistance({
          x: nextPanX,
          y: nextPanY,
        });
      }
    },
    [isPanEnabled, imageWrapperRef, zoomedWrapperSize.width, zoomedWrapperSize.height],
  );

  const handleMouseWheel = useCallback(
    (e) => {
      const delta = Math.sign(e.deltaY);
      const nextZoom = Math.max(1, zoom + (delta > 0 ? 0.2 : -0.2));

      setZoom(nextZoom);

      // reset distance
      setDistance({
        x: 0,
        y: 0,
      });

      lastDistance.current = {
        x: 0,
        y: 0,
      };

      // set zoomed wrapper size
      if (imageWrapperRef.current) {
        const { width, height } = imageWrapperRef.current.getBoundingClientRect();

        setZoomedWrapperSize({
          width: width * zoom,
          height: height * zoom,
        });
      }
    },
    [imageWrapperRef, zoom],
  );

  /**
   * start pan move
   */
  const handleMouseDown = useCallback((e) => {
    setIsMouseEventActive(true);

    const { current } = imageWrapperRef;
    if (current) {
      initialPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }, [imageWrapperRef]);

  /**
   * stop pan move
   */
  const handleMouseUp = useCallback(() => {
    setIsMouseEventActive(false);

    const { current } = imageWrapperRef;
    if (current) {
      lastDistance.current = {
        x: distance.x,
        y: distance.y,
      };
    }
  }, [distance.x, distance.y, imageWrapperRef]);

  const handleMouseOut = useCallback(
    () => {
      handleMouseUp();
    },
    [handleMouseUp],
  );

  return {
    distance,
    zoom,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMouseWheel,
    handleMouseOut,
  };
}
