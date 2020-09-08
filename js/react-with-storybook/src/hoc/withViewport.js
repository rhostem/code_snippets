import React, { Component } from 'react'
import { throttle } from 'throttle-debounce'
import size from '../../styles/size'

const desktopSize = parseInt(size.device.desktop, 10)

/**
 * 컴포넌트에 브라우저 사이즈 변경 이벤트를 연결한 후 상태값을 전달한다.
 * @param {} BaseComponent
 */
export default function withViewport(BaseComponent) {
  return class wrappedComponent extends Component {
    constructor(props) {
      super(props)

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

    handleChangeSize = throttle(400, e => {
      const clientWidth = document.documentElement.clientWidth
      const isMobileView = clientWidth < desktopSize
      this.setState({ isMobileView: isMobileView })
    })

    render() {
      const passedProps = Object.assign({}, this.props, {
        isMobileView: this.state.isMobileView,
      })

      return <BaseComponent {...passedProps} />
    }
  }
}
