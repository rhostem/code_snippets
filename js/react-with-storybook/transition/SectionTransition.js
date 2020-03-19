import React from 'react'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import * as R from 'ramda'
import { debounce } from 'throttle-debounce'
import mixin from 'styles/mixin'
import { pTr } from 'styles/typography'
import { canUseDOM } from 'utils/dom'
import { ResponsiveOnMobile } from 'components/layout'

const keyProxy = new Proxy(
  {},
  {
    get(_target, propKey, _receiver) {
      return propKey
    },
  }
)

const { CURRENT, PREV, NEXT } = keyProxy

const ControlButtonWrap = styled.div`
  position: fixed;
  z-index: 2000;
  top: 10px;
  right: 10px;
`

const ControlButton = styled.button`
  display: block;
  width: ${pTr(50)};
  height: ${pTr(50)};
  font-size: ${pTr(14)};
  font-weight: bold;
  background-color: white;
  border: 1px solid black;
  text-align: center;
`

const SectionWrap = ResponsiveOnMobile.extend`
  ${mixin.fixedCenteredX()};
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  transition: top 700ms ease-in-out;
  overflow-y: scroll;

  ${mixin.scrollbar({
    width: 0,
    trackColor: 'transparent',
    thunmbColor: 'transparent',
  })};
`

/* const sectionDefaultStyle = {
} */

const transitionStyle = {
  entering: {},
  entered: {},
  exiting: {},
  exited: {},
}

const positionStyle = {
  [PREV]: {
    top: '-100vh',
  },
  [CURRENT]: {
    top: '0',
  },
  [NEXT]: {},
}

type Props = {
  sections: Array<React.Component>,
}
type State = {
  sectionIndex: number,
  isEndOfScroll: boolean,
  isTopOfScroll: boolean,
  touchPositionY: number,
}

class SectionTransition extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      sectionIndex: 0,
      isEndOfScroll: null,
      isTopOfScroll: null,
      touchPositionY: null,
    }

    this.currentSectionEl = React.createRef()
  }

  componentDidMount() {
    if (canUseDOM()) {
      this.addSectionEvent()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sectionIndex !== prevState.sectionIndex) {
      this.addSectionEvent()
    }
  }

  getPosition = index => {
    const { sectionIndex } = this.state

    return index === sectionIndex
      ? CURRENT
      : index < sectionIndex
      ? PREV
      : index > sectionIndex
      ? NEXT
      : null
  }

  addSectionEvent = () => {
    const section: HTMLElement = this.currentSectionEl

    if (section) {
      const { isEndOfScroll, isTopOfScroll } = this.getIsEdgeOfScroll(section)

      this.setState({
        isTopOfScroll,
        isEndOfScroll,
      })

      section.addEventListener('touchstart', this.handleTouchStartSection)
      section.addEventListener('touchend', this.handleTouchEndSection)
      section.addEventListener('wheel', this.handleWheelEvent)
      window.addEventListener('keydown', this.handleKeyUp)
    }
  }

  removeSectionEvent = e => {}

  handleTouchStartSection = e => {
    if (e.changedTouches) {
      this.setState({ touchPositionY: e.changedTouches[0].clientY })
    }
  }

  handleTouchEndSection = e => {
    const { isTopOfScroll, isEndOfScroll } = this.getIsEdgeOfScroll(
      this.currentSectionEl
    )

    if (e.changedTouches) {
      const touchPositionY = e.changedTouches[0].clientY
      const isTouchMoveForUp = touchPositionY > this.state.touchPositionY
      const isTouchMoveForDown = touchPositionY < this.state.touchPositionY

      // debugger
      if (isTouchMoveForDown && this.state.isEndOfScroll) {
        this.goToNextSection()
      } else if (isTouchMoveForUp && this.state.isTopOfScroll) {
        this.goToPrevSection()
      } else {
        this.setState({
          touchPositionY,
          isTopOfScroll,
          isEndOfScroll,
        })
      }
    }
  }

  handleWheelEvent = debounce(200, e => {
    const isWheelToDown = e.deltaY > 0 // 스크롤 아래로 휠
    const isWheelToUp = e.deltaY < 0 // 스크롤 위로 휠
    const { isTopOfScroll, isEndOfScroll } = this.getIsEdgeOfScroll(
      this.currentSectionEl
    )

    if (this.state.isEndOfScroll && isWheelToDown) {
      this.goToNextSection()
    } else if (this.state.isTopOfScroll && isWheelToUp) {
      this.goToPrevSection()
    } else {
      this.setState({ isTopOfScroll, isEndOfScroll })
    }
  })

  handleKeyUp = e => {
    const targetKeys = [32, 34, 40, 33, 38]

    if (targetKeys.includes(e.which)) {
      const code = e.which
      const isKeyForDown = code === 32 || code === 34 || code === 40
      const isKeyForUp = code === 33 || code === 38

      const { isTopOfScroll, isEndOfScroll } = this.getIsEdgeOfScroll(
        this.currentSectionEl
      )

      if (this.state.isEndOfScroll && isKeyForDown) {
        this.goToNextSection()
      } else if (this.state.isTopOfScroll && isKeyForUp) {
        this.goToPrevSection()
      } else {
        this.setState({ isTopOfScroll, isEndOfScroll })
      }
    }
  }

  goToNextSection() {
    this.resetEventState()
    this.setState({
      sectionIndex: R.min(
        R.inc(this.state.sectionIndex),
        this.props.sections.length - 1
      ),
    })
  }

  goToPrevSection() {
    this.resetEventState()
    this.setState({ sectionIndex: R.max(R.dec(this.state.sectionIndex), 0) })
  }

  resetEventState = () => {
    this.setState({
      isEndOfScroll: null,
      isTopOfScroll: null,
      touchPositionY: null,
    })
  }

  getIsEdgeOfScroll = (wrapper: HTMLElement) => {
    const content = wrapper.children ? wrapper.children[0] : wrapper
    const contentHeight = content.offsetHeight
    const wrapperScrollTop = wrapper.scrollTop
    const wrapperHeight = wrapper.offsetHeight
    const isTopOfScroll = wrapperScrollTop === 0
    const isEndOfScroll = wrapperScrollTop + wrapperHeight + 10 >= contentHeight

    return {
      isTopOfScroll,
      isEndOfScroll,
    }
  }

  handleChangeSection = index => {
    this.setState({
      sectionIndex: index,
      isTopOfScroll: null,
      isEndOfScroll: null,
    })
  }

  render() {
    return (
      <React.Fragment>
        <ControlButtonWrap>
          <ControlButton
            onClick={() =>
              this.handleChangeSection(R.max(R.dec(this.state.sectionIndex), 0))
            }>
            prev
          </ControlButton>
          <ControlButton
            onClick={() =>
              this.handleChangeSection(
                R.min(
                  R.inc(this.state.sectionIndex),
                  this.props.sections.length - 1
                )
              )
            }>
            next
          </ControlButton>
        </ControlButtonWrap>

        {this.props.sections.map((sectionComp, index) => {
          const position = this.getPosition(index)
          const inView = Math.abs(this.state.sectionIndex - index) <= 1
          return (
            <Transition key={index} in={inView} timeout={500}>
              {state => {
                return (
                  <SectionWrap
                    style={{
                      zIndex: 1000 - index,
                      ...positionStyle[position],
                    }}
                    innerRef={el => {
                      if (position === CURRENT) {
                        this.currentSectionEl = el
                      }
                    }}>
                    {sectionComp()}
                  </SectionWrap>
                )
              }}
            </Transition>
          )
        })}
      </React.Fragment>
    )
  }
}

export default SectionTransition
