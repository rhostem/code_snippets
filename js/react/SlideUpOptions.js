import React, { useState } from 'react'
import _ from 'lodash'
import css from './SlideUpOptions.module.scss'
import anime from 'animejs'
import { Transition } from 'react-transition-group'
import { func, arrayOf, shape, string, any } from 'prop-types'

export const slideOptionsPropType = arrayOf(
  shape({ label: string, value: any })
)

SlideUpOptions.prototype = {
  options: slideOptionsPropType,
  onClickOption: func, // option객체를 파라미터로 넘김
}

const sampleButton = () => {
  return <button>button</button>
}

/**
 * ! button 안에 button 엘레멘트를 렌더링하면 오류가 발생함.
 * ! renderSlide 컴포넌트에 button이 포함되어 있다면 주의.
 *
 * @param {*} param0
 */
export default function SlideUpOptions({
  options = [], // slideOptionsPropType
  onClickOption = value => {},
  renderButton = sampleButton, // 버튼 컴포넌트.
  renderSlideArea = null, //  슬라이드업 영역에 렌더링할 컴포넌트
  duration = 200,
  topPosOnEnter = '30px',
  topPosOnExit = '50px',
  wrapperStyle = {},
  slideWrapperStyle = {}, // 슬라이드업 래퍼 엘레멘트
  optionStyle = {}, // 옵션 엘레멘트 스타일
}) {
  const DURATION = duration
  const optionsAnime = {
    onEnter: node => {
      anime({
        targets: node,
        easing: 'easeInOutQuad',
        opacity: 1,
        top: topPosOnEnter,
        duration: DURATION,
        begin: function(anim) {
          node.style.display = 'block'
        },
      })
    },
    onEntered: node => {
      anime({
        targets: node,
      })
    },
    onExit: node => {
      anime({
        targets: node,
        easing: 'easeInOutQuad',
        opacity: 0,
        duration: DURATION,
        top: topPosOnExit,
        complete: function(anim) {
          node.style.display = 'none'
        },
      })
    },
  }

  // 옵션창 표시여부 컨트롤
  const [isSlideVisible, setIsSlideVisible] = useState(false)
  const toggleSlide = () => setIsSlideVisible(!isSlideVisible)

  // 마운팅된 상태에서 슬라이드 영역의 최초 스타일 조정.
  // top 포지션과 opacity를 조정.
  const slideInitialStyle = _.merge(slideWrapperStyle, {
    display: 'none',
    position: 'absolute',
    zIndex: 1000,
    top: topPosOnExit,
    opacity: 0,
  })

  // // FIXME: 항상 보임
  // if (!isSlideVisible) {
  //   setTimeout(() => {
  //     toggleSlide();
  //   }, 200);
  // }

  return (
    <div className={css.wrapper} style={wrapperStyle}>
      <div onClick={toggleSlide}>{renderButton()}</div>
      <Transition
        in={isSlideVisible}
        onEnter={optionsAnime.onEnter}
        onExit={optionsAnime.onExit}
        timeout={DURATION}>
        {state =>
          _.isNil(renderSlideArea) ? (
            <div className={css.options} style={slideInitialStyle}>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    toggleSlide()
                    onClickOption(option)
                  }}
                  style={optionStyle}>
                  {option.label}
                </div>
              ))}
            </div>
          ) : (
            renderSlideArea({
              initialStyle: slideInitialStyle,
              toggleSlide,
            })
          )
        }
      </Transition>

      {isSlideVisible && <div className={css.mask} onClick={toggleSlide} />}
    </div>
  )
}
