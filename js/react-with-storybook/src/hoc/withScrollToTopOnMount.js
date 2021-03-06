import React, { Component } from 'react'

/**
 * 마운트 완료시 스크롤을 최상단으로 옮긴다
 */
export default function withScrollToTopOnMount(BaseComponent) {
  return class wrappedComponent extends Component {
    componentDidMount(prevProps) {
      window.scrollTo(0, 0)
    }

    render() {
      const passedProps = Object.assign({}, this.props, {})
      return <BaseComponent {...passedProps} />
    }
  }
}
