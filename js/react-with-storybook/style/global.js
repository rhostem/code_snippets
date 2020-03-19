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
  }

  html {
    font-family: 'Noto Sans KR', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
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
    outline: none;
    -webkit-appearance: none;
  }

  button {
    background: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
`

export default GlobalStyle
