export default function scrollToElement(
  el?: HTMLElement | null,
  {
    scrollWhenUnvisible = true,
    topThreshold = 200,
    bottomThreshold = 200,
    scrollAdjustment = 200,
  }: {
    scrollWhenUnvisible?: boolean;
    topThreshold?: number; // 스크롤 작동을 위하 뷰포트 상단과 요소 사이의 최소 거리
    bottomThreshold?: number; // 스크롤 작동을 위하 뷰포트 하단과 요소 사이의 최소 거리
    scrollAdjustment?: number; // 스크롤 후 화면 상단에서 요소까지의 간격
  } = {}
) {
  if (el) {
    // 전달한 값보다 여유를 준다.
    const threshold = {
      top: topThreshold * 1.2,
      bottom: bottomThreshold * 1.2,
    };

    const { top, bottom } = el.getBoundingClientRect();
    const outofTop = top < threshold.top;
    const outofBottom = bottom > window.innerHeight - threshold.bottom;
    const isNotInViewport = outofTop || outofBottom;
    const isSrollable = scrollWhenUnvisible ? isNotInViewport : true;

    if (isSrollable) {
      const scrollAmount = top - scrollAdjustment;

      window.scrollTo(0, window.scrollY + scrollAmount);
    }
  }
}
