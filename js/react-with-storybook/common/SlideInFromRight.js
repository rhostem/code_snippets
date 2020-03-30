import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

const defaultDuration = 400
const initialRight = '-1024px'
const enteredRight = '0'

const defaultStyle = {
  position: 'relative',
  transition: `all ${defaultDuration}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { position: 'absolute', right: initialRight },
  entered: { right: enteredRight },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type Props = {
  in: boolean,
  keyProp: string,
  duration: number,
  style?: any,
}
type State = {}

/**
 * 화면 우측에서 슬라이드 인
 *
 * @class FadeIn
 * @extends {Component}
 */
class SlideInFromRight extends Component {
  props: Props
  state: State
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Transition
        key={this.props.keyProp}
        in={this.props.in}
        timeout={this.props.duration || defaultDuration}
        appear
        unmountOnExit>
        {status => (
          <div
            style={{
              ...defaultStyle,
              ...this.props.style,
              ...transitionStyles[status],
            }}>
            {this.props.children}
          </div>
        )}
      </Transition>
    )
  }
}

export default FadeIn
