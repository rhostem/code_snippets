import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.3);
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 2em;
  overflow: hidden;
  width: 500px;
  height: 500px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 0;
  }
`

const canUseDOM = () => typeof window !== undefined

class Modal extends React.Component {
  static defaultProps = {
    portalId: 'modalRoot',
    overlayStyle: {},
    contentStyle: {},
    overlayCSS: undefined,
    contentCSS: undefined,
    isFullCover: false, // 뷰포트를 모두 채우는 모달 스타일 적용
    isOpen: false,
    onRequestClose: () => {},
  }

  get portalContainer() {
    return canUseDOM() ? document.getElementById(this.props.portalId) : null
  }

  get fullCoverContentStyle() {
    return {
      width: 'initial',
      height: 'initial',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: 'none',
    }
  }

  get contentStyle() {
    return this.props.isFullCover
      ? {
          ...this.fullCoverContentStyle,
          ...this.props.contentStyle,
        }
      : {
          ...this.props.contentStyle,
        }
  }

  componentDidMount() {
    if (!this.portalContainer) {
      const root = document.createElement('div')
      root.id = this.props.portalId
      document.documentElement.appendChild(root)
      window.addEventListener('keydown', this.handlePressESC)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC)
  }

  handlePressESC = e => {
    if (e.which === 27 && this.props.onRequestClose) {
      this.props.onRequestClose()
    }
  }

  handleClickContent = e => {
    e.stopPropagation()
  }

  render() {
    const { overlayStyle, overlayCSS, contentCSS } = this.props

    if (this.props.isOpen && this.portalContainer) {
      return ReactDOM.createPortal(
        <Overlay
          style={overlayStyle}
          css={overlayCSS}
          onClick={this.props.onRequestClose}
        >
          <Content
            style={this.contentStyle}
            css={contentCSS}
            onClick={this.handleClickContent}
          >
            {this.props.children}
          </Content>
        </Overlay>,
        this.portalContainer
      )
    } else {
      return null
    }
  }
}

export default Modal
