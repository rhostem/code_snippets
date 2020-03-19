import { css } from 'styled-components'

export default ({
  width = '5px',
  trackColor = '#eee',
  thunmbColor = '#ddd',
  radius = 0,
}) => {
  return css`
    border-radius: ${radius};
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
