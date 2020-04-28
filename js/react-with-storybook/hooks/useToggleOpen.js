import { useEffect, useState, useCallback } from 'react'

/**
 * true, false 값을 전한하는 로직
 *
 * @param {*} initialValue 초기값
 * @param {*} option.onTrue  값이 true 때 콜백
 * @param {*} option.onFalse 값이 false일 때 콜백
 */
export const useToggle = (initialValue = false, { onTrue, onFalse } = {}) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  const toggleOpen = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
      if (typeof onClose === 'function') {
        onFalse()
      }
      return false
    } else {
      setIsOpen(true)
      if (typeof onOpen === 'function') {
        onTrue()
      }
      return true
    }
  }, [isOpen, onFalse, onTrue])

  useEffect(() => {
    setIsOpen(initialValue)
    return () => {}
  }, [initialValue])

  return [isOpen, toggleOpen]
}
