import React, { Component } from 'react'
import { throttle } from 'throttle-debounce'
import size from '../../styles/size'

const desktopSize = parseInt(size.device.desktop, 10)

export default function withViewport(BaseComponent) {
  return class wrappedComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isMobileView: true,
      }
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.handleChangeSize)
        this.handleChangeSize() // 뷰포트 사이즈를 최초 한번 확인한다.
      }
    }

    componentWillMount() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.handleChangeSize)
      }
    }

    handleChangeSize = throttle(400, (e) => {
      const clientWidth = document.documentElement.clientWidth
      const isMobileView = clientWidth < desktopSize
      this.setState({ isMobileView: isMobileView })
    })

    render() {
      const passedProps = Object.assign({}, this.props, {
        isMobileView: this.state.isMobileView
      })

      return <BaseComponent {...passedProps} />
    }
  }
}