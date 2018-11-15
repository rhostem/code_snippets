/**
 * 스크립트 로드
 */
export function loadScript(src, onload) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = onload;

  const firstScript = document.getElementsByTagName('script')[0];

  firstScript.parentNode.insertBefore(script, firstScript);
}
