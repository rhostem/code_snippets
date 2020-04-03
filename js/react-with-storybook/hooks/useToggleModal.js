import { useState, useCallback } from 'react'
import useScrollLock from 'components/hooks/useScrollLock'

/**
 * 모달 열림, 닫힘을 제어하는 로직
 * @param {*} param0
 */
export const useToggleModal = ({ onClose, onOpen, scrollLock = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false)

  useScrollLock(isOpen => (scrollLock ? isOpen === true : false))

  const toggleModal = useCallback(() => {
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
    toggleModal,
  }
}
