import { css } from 'styled-components'

const scrollbar = ({
  width = '5px',
  trackColor = '#eee',
  thunmbColor = '#ddd',
  radius = 0,
}) => {
  return css`
    &::-webkit-scrollbar {
      width: ${width};
    }
    &::-webkit-scrollbar-track {
      background-color: ${trackColor};
      border-radius: ${radius};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${thunmbColor};
      border-radius: ${radius};
    }
  `
}

export default scrollbar

export const transparentScrollbar = () => {
  return scrollbar({
    width: 0,
    trackColor: 'transparent',
    thunmbColor: 'transparent',
  })
}
