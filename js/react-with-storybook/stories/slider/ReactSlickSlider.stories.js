import React, { useRef, useCallback } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import ReactSlickSlider from '../../slider/ReactSlickSlider'
import Slider from 'react-slick'
import { css } from 'styled-components'

export default {
  title: 'slider/ReactSlickSlider',
  decorators: [withKnobs],
}

export const Default = () => <ReactSlickSlider></ReactSlickSlider>

export const SliderRef = () => {
  const sliderRef = useRef(null)
  const setSlider = useCallback((c) => (sliderRef.current = c), [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: setSlider,
  }

  return (
    <div
      css={css`
        width: 500px;
        text-align: center;
        margin: 0 auto;
        background: #efefef;
      `}
    >
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>

      <div
        css={`
          margin-top: 5rem;
        `}
      >
        <h2>custom buttons</h2>
        <button onClick={() => sliderRef.current?.slickPrev()}>LEFT</button>
        <button onClick={() => sliderRef.current?.slickNext()}>RIGHT</button>
      </div>
    </div>
  )
}
