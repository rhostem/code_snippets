// import { css } from 'styled-components'
import * as centered from './centered'
import * as shape from './shape'
import { clearFix } from 'polished'
import { BASE_LINE_HEIGHT } from '../typography'
import { css } from 'styled-components'
import scrollbar from './scrollbar'

const centerCoveredBg = url => {
  return css`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${url});
  `
}

// 최대 높이를 지정하고 overflow는 보이지 않게 한다.
export const setHeightLimit = ({
  lineHeight = BASE_LINE_HEIGHT,
  line = 1,
  isHeightFixed = false,
}) => {
  return css`
    position: relative;
    line-height: ${lineHeight};
    min-height: ${lineHeight * 1}em;
    ${!isHeightFixed ? 'max-' : ''}height: calc(${lineHeight} * ${line}em);
    overflow: hidden;
  `
}

export default {
  ...shape,
  ...centered,
  clearFix,
  centerCoveredBg,
  setHeightLimit,
  scrollbar,
}
