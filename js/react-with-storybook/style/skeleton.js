import { css } from 'styled-components'

const skeleton = ({
  baseColor = '#ddd',
  shiningColor = '#e8e8e8',
  duration = 1.5,
  trackWidth = '200px',
  borderRadius = 0,
} = {}) => css`
  &:empty:after {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: ${borderRadius};
    background-color: ${baseColor};
    background-image: linear-gradient(
      90deg,
      ${baseColor} 0px,
      ${shiningColor} 40px,
      ${baseColor} 80px
    );
    background-repeat: no-repeat;
    background-size: 100%;
    animation: skeletonShine-${trackWidth} ${duration}s infinite linear;
  }

  @keyframes skeletonShine-${trackWidth} {
    0% {
      background-position: -80px 0;
    }
    40%,
    100% {
      background-position: ${trackWidth} 0;
    }
  }
`

export default skeleton
