// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled, { keyframes } from 'styled-components'
import styles from '../../styles'
import VideoSeekBar from './VideoSeekBar'
import { debounce } from 'throttle-debounce'
import playBtnImg from './ic-play-btn.png'
import pauseBtnImg from './ic-pause-btn.png'
import loadingCircle from './loading-circle.png'
import * as R from 'ramda'

const VideoWrapper = styled.div`
  position: relative;
`

const Video = styled.video`
  position: relative;
  width: 100%;
`

const PlayButton = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: url(${playBtnImg});
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: 50px;
  &:hover {
    cursor: pointer;
  }
`

const PauseButton = PlayButton.extend`
  background-image: url(${pauseBtnImg});
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SeekingSpinner = styled.div`
  ${styles.mixin.centered()} z-index: 2;
  width: 30px;
  height: 30px;
  background: url(${loadingCircle}) no-repeat center;
  background-size: contain;
  animation: ${spin} 2s linear infinite;
`

type Props = {
  videoData: Video,
  src: string, // video source url
  isPointVisible: boolean, // 이미지 포인트 표시 여부
  onVideoLoaded?: <T>(param: HTMLVideoElement) => T,
}
type State = {
  video?: HTMLVideoElement,
  currentTime: number,
  duration: number,
  isPlaying: boolean,
  isSeeking: boolean,
  isMouseOver: boolean,
}

/**
 * 비디오 미리보기.
 * 커스텀 컨트롤러. 포린트 추가 기능.
 *
 * @class VideoPreview
 * @extends {React.Component}
 */
class VideoPreview extends React.Component<Props, State> {
  static defaultProps = {}
  handleSeekBar: Function
  handlePlayPause: Function
  requestVideoPosition: Function
  isSeekbarChangeInvoked = false

  constructor(props: Props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      isSeeking: false,
      isMouseOver: false,
    }

    this.handleSeekBar = this.handleSeekBar.bind(this)
    this.handlePlayPause = this.handlePlayPause.bind(this)
    this.requestVideoPosition = debounce(
      500,
      this.requestVideoPosition.bind(this)
    )
  }

  componentDidMount() {
    this.getVideoControl()
  }

  /**
   * HTML5 비디오 로드 및 이벤트 연결
   *
   * @memberof VideoPreview
   */
  getVideoControl() {
    const video: HTMLVideoElement = window.document.getElementById('video')

    if (video) {
      video.onloadeddata = () => {
        if (typeof this.props.onVideoLoaded === 'function') {
          this.props.onVideoLoaded(video)
        }

        this.setState({
          video,
          duration: video.duration,
        })

        // 비디오 플레이타임 업데이트
        video.ontimeupdate = () => {
          // 탐색바 change 이벤트가 발생한 후에는 업데이트하지 않아야 한다.
          if (!this.isSeekbarChangeInvoked) {
            this.setState({
              currentTime: video.currentTime,
            })
          }
        }

        let seekIntervalId
        video.onplaying = () => {
          clearInterval(seekIntervalId)
          seekIntervalId = setInterval(() => {
            if (video.seeking) {
              this.setState({ isSeeking: true })
            } else if (!video.seeking && this.state.isSeeking) {
              this.setState({ isSeeking: false })
            }
          }, 300)
        }
      }

      video.onerror = () => {
        alert('비디오 로드에 실패했습니다.')
      }
    }
  }

  /**
   * 재생 멈춤 컨트롤
   *
   * @memberof VideoPreview
   */
  handlePlayPause() {
    const { video } = this.state
    // 비디오가 로드되어야만 진행
    if (!video) {
      return
    }

    const isPlayRequired = () => !this.state.isPlaying

    if (isPlayRequired()) {
      video.play()
      this.setState({
        isPlaying: true,
      })
    } else {
      video.pause()
      this.setState({
        isPlaying: false,
      })
    }
  }

  /**
   * 탐색 컨트롤
   *
   * @param {Event} e
   * @memberof VideoPreview
   */
  handleSeekBar(value) {
    const { video } = this.state
    this.isSeekbarChangeInvoked = true

    if (video) {
      this.setState({ currentTime: value })
      this.requestVideoPosition(value) // debounced
    }
  }

  requestVideoPosition(updateTime) {
    const { video } = this.state

    if (video) {
      video.currentTime = updateTime
      this.isSeekbarChangeInvoked = false
    }
  }

  render() {
    const { video } = this.state
    let points = this.props.videoData
      ? this.props.videoData
          .toJS()
          .info.map(info => info.time)
          .filter(time => time !== -1)
          .sort((a, b) => a - b)
      : []

    points = R.uniq(points)

    return (
      <div>
        <VideoWrapper
          onMouseEnter={() => this.setState({ isMouseOver: true })}
          onMouseLeave={() => this.setState({ isMouseOver: false })}>
          <Video id="video">
            <source src={this.props.src} />
            <p>Your browser does not support HTML5 video.</p>
          </Video>

          {!this.state.isPlaying && (
            <PlayButton onClick={this.handlePlayPause} />
          )}

          {this.state.isPlaying && this.state.isMouseOver && (
            <PauseButton onClick={this.handlePlayPause} />
          )}

          {this.state.isSeeking && <SeekingSpinner />}
        </VideoWrapper>

        <VideoSeekBar
          video={video}
          points={points}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          onChangeSeekBar={this.handleSeekBar}
          isPointVisible={this.props.isPointVisible}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators(
    {
      // actionName,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPreview)
