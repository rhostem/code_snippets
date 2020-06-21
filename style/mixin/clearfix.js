import { css } from 'styled-components'

export default function clearfix() {
  return css`
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  `
}
