import { useRef, useState, useEffect, useCallback } from 'react'

function arrayBufferToBase64(buffer) {
  var binary = ''
  var bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b) => (binary += String.fromCharCode(b)))

  return window.btoa(binary)
}

/**
 * NOTE: 이미지 서버가 cors를 허용해 줘야 사용 가능하다.
 *
 * @param {} imageUrl 원본 이미지
 */
export default function useImageLoader(imageUrl, { useImageStr = true } = {}) {
  const [imageUrlLoaded, setImageUrlLoaded] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const imageCacheMap = useRef(new Map())

  const getCahcedImage = useCallback((img) => {
    if (!!img && imageCacheMap.current.has(img)) {
      return imageCacheMap.current.get(img)
    }
  }, [])

  const setCachedImage = useCallback((key, data) => {
    imageCacheMap.current.set(key, data)
  }, [])

  const timer = useRef(null)

  const onFail = useCallback(() => {
    // 실패하면 이미지 url을 그대로 리턴하도록 한다.
    setIsLoading(false)
    setImageUrlLoaded(imageUrl)
  }, [imageUrl])

  const onLoadImage = useCallback(
    (data) => {
      setCachedImage(imageUrl, data)
      setImageUrlLoaded(data)
      setIsLoading(false)
    },
    [imageUrl, setCachedImage]
  )

  useEffect(() => {
    if (!!imageUrl) {
      // 원본 이미지가 바뀌면 다음 이미지 로더를 위해 로딩된 이미지 초기화
      setImageUrlLoaded(null)
    }
  }, [imageUrl])

  useEffect(() => {
    clearTimeout(timer.current)

    // 일정시간 딜레이되면 로딩스피너 표시
    timer.current = setTimeout(() => {
      if (!imageUrlLoaded) {
        setIsLoading(true)
        console.log('delayed')
      }
    }, 300)
    return () => {}
  }, [imageUrlLoaded])

  useEffect(() => {
    if (!imageUrl) {
      console.error('[useImageLoader] no image url')
      return
    } else if (typeof window.fetch === 'function') {
      const cachedImage = getCahcedImage(imageUrl)

      if (cachedImage) {
        setImageUrlLoaded(cachedImage)
        setIsLoading(false)
      } else {
        var headers = new Headers({})
        var options = {
          method: 'GET',
          headers: headers,
          mode: 'cors',
          cache: 'default',
        }
        var request = new Request(imageUrl)

        fetch(request, options)
          .then(async (response) => {
            try {
              if (useImageStr) {
                // NOTE: 이미지 데이터를 base64 문자열로 변환
                const buffer = await response.arrayBuffer()
                const base64Flag = 'data:image/jpeg;base64,'
                const imageStr = arrayBufferToBase64(buffer)
                const src = base64Flag + imageStr
                onLoadImage(src)
              } else {
                onLoadImage(imageUrl)
              }
            } catch (e) {
              onFail()
            }
          })
          .catch((e) => {
            onFail()
          })
      }
    } else {
      // fetch API를 지원하지 않으면 이미지 로딩 처리하지 않음.
      onLoadImage(imageUrl)
    }
  }, [getCahcedImage, imageUrl, onFail, onLoadImage, useImageStr])

  return [imageUrlLoaded, isLoading]
}
