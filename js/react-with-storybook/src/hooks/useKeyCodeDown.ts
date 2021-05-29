import { useEffect, useMemo } from 'react'

const useKeyDown = (
  listener: (e: KeyboardEvent) => void,
  activationPredicate?: () => boolean
) => {
  const isActivated = useMemo(
    () => (activationPredicate ? activationPredicate() : false),
    [activationPredicate]
  )

  useEffect(() => {
    if (isActivated) {
      window.addEventListener('keydown', listener)
    } else {
      window.removeEventListener('keydown', listener)
    }

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [activationPredicate, isActivated, listener])
}

export default useKeyDown

export const useKeycodeDown = (
  keyCode: string,
  onKeyDown: (e: KeyboardEvent) => void
) => {
  useKeyDown(e => {
    if (e.keyCode === keyCode) {
      onKeyDown()
    }
  })
}

export const useKeyNameDown = (
  keyName: string,
  onKeyDown: (e: KeyboardEvent) => void
) => {
  useKeyDown(e => {
    if (e.key === keyName) {
      onKeyDown()
    }
  })
}
