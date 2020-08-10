import { css } from 'styled-components'

export const center = () => {
  return css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
}

export const centerX = () => {
  return css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `
}

export const centerY = () => {
  return css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `
}

export const fixedCenter = () => {
  return css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
}

export const fixedCenterX = () => {
  return css`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  `
}

export const fixedCenterY = () => {
  return css`
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
  `
}
