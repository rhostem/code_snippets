import { css } from 'styled-components'
import circle from 'styles/mixin/circle'
import { centerY } from 'styles/mixin/center'

/**
 * 목록에 사용할 커스텀 bullet. li 같은 태그에 사용한다.
 * @param {*} args
 */
function customListBullet({
  paddingLeft = '19px',
  size = '4px',
  color = '#999',
}) {
  return css`
    padding-left: ${paddingLeft};

    &::before {
      content: ' ';
      ${circle(size)};
      ${centerY()}
      left: 0;
      background: ${color};
    }
  `
}

export default customListBullet
