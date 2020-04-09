import { useState, useCallback } from 'react'

/**
 * 모달 열림, 닫힘을 제어하는 로직
 * @param {*} param0
 */
export const useToggleOpen = ({ onClose, onOpen, scrollLock = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false)

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

  return {
    isOpen,
    toggleOpen,
  }
}
