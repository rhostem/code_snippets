import { CSSProperties } from 'react'

export const center = (): CSSProperties => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const centerX = (): CSSProperties => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
})

export const centerY = (): CSSProperties => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
})

export const fixedCenter = (): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

export const fixedCenterX = (): CSSProperties => ({
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
})

export const fixedCenterY = (): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
})
