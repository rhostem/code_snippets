import { normalize } from 'polished'
import { VIEWPORT_RESPONSIVE_FONT_SIZE, BASE_LINE_HEIGHT } from './typography'
import { createGlobalStyle } from 'styled-components'
import { size, media, typography } from 'styles'
import ReactModalStyle from 'styles/ReactModal'

/* ${process.env.NODE_ENV !== 'production' ? 'outline: 1px solid tomato;' : ''}; */
export default createGlobalStyle`
  ${normalize()};

  * {
    box-sizing: border-box;
    font-family: inherit;
    word-break: inherit; /* 단어 단위로 자르기 */
  }

  html {
    font-family: "Spoqa Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: ${VIEWPORT_RESPONSIVE_FONT_SIZE};
    line-height: ${BASE_LINE_HEIGHT};
    color: #383838;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    ${media.LargerThanAppMax} {
      font-size: ${typography.BASE_FONT_SIZE};
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

  input {
    outline: none;

    &[type="text"] {
      ime-mode: desativated;
    }

    &[type="passwrod"] {
      ime-mode: auto;
    }
  }


  button {
    background: none;
    border: none;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
  }

  ${ReactModalStyle};
`
