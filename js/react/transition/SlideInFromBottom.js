import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

type Props = {
  in: boolean,
  keyProp: string,
  duration: number,
  style?: any,
  initialTop: string, // entering 시작할 때 top 값
}
type State = {}

/**
 * 화면 하단에서
 *
 * @class FadeIn
 * @extends {Component}
 */
class FadeIn extends Component {
  props: Props
  state: State
  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const defaultDuration = 400
    const initialTop = this.props.initialTop || '1024px'
    const enteredPosition = '0'

    const defaultStyle = {
      position: 'relative',
      transition: `all ${defaultDuration}ms ease-in-out`,
      opacity: 1,
    }

    const transitionStyles = {
      entering: { position: 'absolute', top: initialTop },
      entered: { top: enteredPosition },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }

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
