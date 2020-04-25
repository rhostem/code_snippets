import { useEffect, useState, useCallback } from 'react'

/**
 * true, false 값을 전한하는 로직
 *
 * @param {*} initialValue 초기값
 * @param {*} option.onClose 값이 false일 때 콜백
 * @param {*} option.onOpen  값이 true 때 콜백
 */
export const useToggleOpen = (
  initialValue = false,
  { onClose, onOpen } = {}
) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
      if (typeof onClose === 'function') {
        onClose()
      }
    } else {
      setIsOpen(true)
      if (typeof onOpen === 'function') {
        onOpen()
      }
    }
  }, [isOpen, onClose, onOpen])

  useEffect(() => {
    setIsOpen(initialValue)
    return () => {}
  }, [initialValue])

  return [isOpen, toggleOpen]
}
