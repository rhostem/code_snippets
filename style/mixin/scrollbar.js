import { css } from 'styled-components'

const scrollbarStyled = ({
  width = 0, // 세로 스크롤바 두께
  height = 0, // 가로 스크롤바 두께
  trackColor = '#eee',
  thunmbColor = '#ddd',
  radius = 0,
} = {}) => {
  return css`
    &::-webkit-scrollbar {
      width: ${width};
      height: ${height};
      &:hover {
        cursor: pointer;
      }
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

export const transparentScrollbar = () => {
  return scrollbarStyled({
    width: 0,
    height: 0,
    trackColor: 'transparent',
    thunmbColor: 'transparent',
  })
}


export const scrollbarJSS = ({
  width = 0, // 세로 스크롤바 두께
  height = 0, // 가로 스크롤바 두께
  trackColor = '#eee',
  thunmbColor = '#ddd',
  radius = 0,
} = {}) => {
  return {
    '&::-webkit-scrollbar': {
      width,
      height,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: trackColor,
      borderRadius: radius,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: thunmbColor,
      borderRadius: radius,
    },
  }
}
