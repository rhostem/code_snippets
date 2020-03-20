import { centeredY } from 'styles/mixin/centered'
import { css } from 'styled-components'

// 엘레멘트 우측에 여백을 추가하고 여백 중간에 수직선을 추가한다.
export default function dividerLine(
  height = '10px',
  distance = '10px', // 항목과 라인의 거리
  color = '#ccc'
) {
  return css`
    position: relative;
    margin-right: calc(${distance} * 2);

    &:after {
      ${centeredY()}
      content: ' ';
      width: 1px;
      height: ${height};
      background: ${color};
      right: calc(-1 * ${distance});
    }
  `
}
