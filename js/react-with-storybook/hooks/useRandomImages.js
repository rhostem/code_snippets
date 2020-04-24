import { useState, useEffect, useCallback, useMemo } from 'react'

// https://picsum.photos
export default function useRandomImages({
  size = 5,
  width = 200,
  height = 300,
  useFullSize = false,
} = {}) {
  const [imageUrls, setImageUrls] = useState([])

  // NOTE: 리스트는 풀 사이즈로 제공한다. 용량 큼.
  useEffect(() => {
    if (useFullSize) {
      fetch(
        `https://picsum.photos/v2/list?page=${parseInt(
          Math.random() * 100
        )}&limit=${size}`
      ).then(async (res) => {
        const data = await res.json()
        setImageUrls(data.map((image) => image.download_url))
      })
    } else {
      const urls = new Array(size).fill('').map((_, index) => {
        return `https://picsum.photos/${width}/${height}?random=${index}`
      })
      setImageUrls(urls)
    }
  }, [useFullSize, size, width, height])

  return [imageUrls]
}
