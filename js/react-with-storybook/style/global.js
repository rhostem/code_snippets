import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

/**
 * reset 기능을 포함한 전역 스타일
 * styled-component용
 */
const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
    font-family: inherit;
    word-break: inherit; /* 단어 단위로 자르기 */
    outline: none;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
  }

  html {
    font-family: Noto Sans KR, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 14px;
    ${UNDER_TABLET} {
      font-size: ${FONTSIZE_MOBILE};
    }
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    margin: 0;
  }

  li {
    list-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
  }

  input {
    appearance: none;
    &::placeholder {
      color: rgba(23, 75, 125, 0.6);
    }
  }

  input, select {
    ${UNDER_TABLET} {
      font-size: 16px;
    }
  }

  textarea {
    &::placeholder {
      color: rgba(23, 75, 125, 0.6);
    }
  }

  button {
    padding: 0;
    background: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    color: inherit;

    &:hover {
      cursor: pointer;
    }
  }

`

export default GlobalStyle
