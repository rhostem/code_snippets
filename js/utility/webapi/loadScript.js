/**
 * script 태그로 외부 js 파일 불러오기
 *
 * @param {*} src 스크립트 URL
 * @param {*} option.onload 스크립트가 로드된 후 실행할 콜백. 로드되었다면 바로 실행한다.
 * @param {*} option.id script 태그 id
 * @param {*} option.async 비동기 로드
 */
const loadScript = (src = '', { onload, id, async = false, onerror } = {}) => {
  const didNotLoaded = !document.getElementById(id)

  if (didNotLoaded) {
    let script = document.createElement('script')
    script.src = src
    script.id = id || `script_${+new Date()}`
    script.async = async

    if (typeof onLoad === 'function') {
      script.onload = onload
    }

    if (typeof onerror === 'function') {
      script.onerror = onerror
    }

    document.body.appendChild(script)
  } else {
    if (typeof onload === 'function') {
      onload()
    }
  }
}

export default loadScript
