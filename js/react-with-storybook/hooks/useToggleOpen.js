import { useEffect, useState, useCallback } from 'react'

export const useToggleOpen = (
  initialOpen = false,
  { onClose, onOpen } = {}
) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

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
    setIsOpen(initialOpen)
    return () => {}
  }, [initialOpen])

  return {
    isOpen,
    toggleOpen,
  }
}
