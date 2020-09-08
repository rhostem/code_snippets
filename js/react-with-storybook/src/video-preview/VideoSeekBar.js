// @flow
import * as React from 'react'
import autobind from 'class-autobind'
import styled from 'styled-components'
import styles from '../../styles'
import toHHMMSS from '../../utils/toHHMMSS'
import pointMarker from './pointMarker.svg'

const SeekBar = styled.div`
  position: relative;
  margin: 5px auto;
`

const TimeWrap = styled.div`
  ${styles.mixin.clearFix()} font-size: 14px;
  margin-top: 0.5em;
`
const CurrentTime = styled.span`
  float: left;
`
const TotalTime = styled.span`
  float: right;
`

/**
 * 커스텀 스타일 range input
 */
const RangeInput = styled.input`
  width: 100%;

  &[type='range'] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }

  &[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &[type='range']:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &[type='range']::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #f57c00;
    margin-top: -7px;
  }

  &[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #f57c00;
    border: 0px solid #f57c00;
  }
`

const pointMarkerWidth = '26px'
const PointMarkerWrap = styled.div`
  position: relative;
  width: calc(100% - 16px);
  margin: 0 8px -10px;
  height: 32px;
`
const ImagePointMarker = styled.a`
  position: absolute;
  top: 0;
  width: ${pointMarkerWidth};
  height: 32px;
  padding-top: 4px;
  background: url(${pointMarker}) no-repeat center;
  background-size: contain;
  color: ${styles.color.text};
  text-align: center;
  font-size: 10px;
`

type Props = {
  video?: HTMLVideoElement,
  duration: number,
  onChangeSeekBar: Function,
  points: Array<any>,
  isPointVisible: boolean, // 이미지 포인트 표시 여부
}
type State = {}

class VideoSeekBar extends React.Component<Props, State> {
  _isPlayingOnMouseDown = false

  constructor(props: Props) {
    super(props)
    this.state = {}
    autobind(this)
  }

  handleMouseDown() {
    if (this.props.video) {
      this._isPlayingOnMouseDown = !this.props.video.paused
      this.props.video.pause()
    }
  }

  handleMouseUp() {
    if (this.props.video) {
      // 재생 도중에 클릭을 했을 경우 일시 멈춤 후 다시 시작해야 한다.
      // 멈춤 상태에서 탐색했을 때는 다시 재생할 필요 없다.
      if (this._isPlayingOnMouseDown) {
        this.props.video.play()
      }
    }
  }

  handleChange(e) {
    this.props.onChangeSeekBar(+e.target.value)
  }

  render() {
    const { currentTime = 0, duration = 0, isPointVisible, points } = this.props

    const calcMarkerPosition = time => {
      return time === 0 ? 0 : (time / duration) * 100
    }

    return (
      <SeekBar isPointVisible={isPointVisible}>
        {isPointVisible && (
          <PointMarkerWrap>
            {Array.isArray(points) &&
              points.map((point: number, i) => (
                <ImagePointMarker
                  key={i}
                  style={{
                    left: `calc(${calcMarkerPosition(point)}% - 12px)`,
                  }}>
                  {i + 1}
                </ImagePointMarker>
              ))}
          </PointMarkerWrap>
        )}
        <RangeInput
          type="range"
          step="any"
          value={currentTime}
          max={duration && duration.toFixed(4)}
          onChange={this.handleChange}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
        <TimeWrap>
          <CurrentTime>{toHHMMSS(currentTime)}</CurrentTime>
          <TotalTime>{toHHMMSS(duration)}</TotalTime>
        </TimeWrap>
      </SeekBar>
    )
  }
}

export default VideoSeekBar
