import { css } from 'styled-components'

/**
 * 텍스트 뒤쪽에 반투명 하이라이트를 추가한다.
 * @param {} style
 */
const textHighlight = (style = {}) => css`
  &::before {
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    content: ' ';
    width: 100%;
    height: 12px;
    opacity: 0.4;
    border-radius: 6px;
    background: #f5eb6f;

    ${style}
  }
`

export default textHighlight
