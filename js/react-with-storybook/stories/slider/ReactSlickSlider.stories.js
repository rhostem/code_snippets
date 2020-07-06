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
import styled, { css } from 'styled-components'

export default {
  title: 'slider/ReactSlickSlider',
  decorators: [withKnobs],
}

export const CustomStyle = () => <ReactSlickSlider></ReactSlickSlider>

const Slide = styled.div`
  height: 300px;
  position: relative;

  & > * {
    font-size: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const CustomButton = () => {
  const sliderRef = useRef(null)
  const setSlider = useCallback(c => (sliderRef.current = c), [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: setSlider,
  }

  const items = new Array(5).fill(0).map((_, index) => index + 1)

  return (
    <div
      css={css`
        width: 500px;
        text-align: center;
        margin: 0 auto;

        .slick-arrow {
          display: none !important;
        }
      `}
    >
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <Slide key={index}>
              <div>{item}</div>
            </Slide>
          )
        })}
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

export const VerticalSlider = () => {
  const sliderRef = useRef(null)
  const setSlider = useCallback(c => (sliderRef.current = c), [])

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: setSlider,
    vertical: true,
    dotClassName: 'slick-dots',
  }

  const items = new Array(5).fill(0).map((_, index) => index + 1)

  return (
    <div
      css={css`
        width: 500px;
        margin: 50px auto;
        text-align: center;
        position: relative;

        .slick-arrow {
          display: none !important;
        }

        .slick-dots {
          display: flex !important;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
        }

        button {
          z-index: 10;
          height: 30px;
          &.down,
          &.up {
            padding: 5px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &.down {
            bottom: -30px;
          }
          &.up {
            top: -30px;
          }
        }
      `}
    >
      <button className="up" onClick={() => sliderRef.current?.slickPrev()}>
        UP
      </button>
      <button className="down" onClick={() => sliderRef.current?.slickNext()}>
        DOWN
      </button>

      <Slider {...settings}>
        {items.map((item, index) => {
          return (
            <Slide key={index}>
              <div>{item}</div>
            </Slide>
          )
        })}
      </Slider>
    </div>
  )
}
