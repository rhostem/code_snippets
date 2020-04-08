import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

const Wrap = styled.div`
  width: 640px;
  margin: 0 auto;

  .slick-slider {
    /* dot style 커스터마이징  */
    .slick-dots {
      position: relative;
      bottom: initial;
      margin: 30px auto 0;

      li {
        width: 14px;
        margin: 0;
        button {
          position: relative;
          padding: 0;
          bottom: 0;
          width: 100%;

          &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: #8b8c8a;
            color: transparent;
            transition: width 0.1s linear;
          }
        }

        &.slick-active {
          width: 32px;
          button {
            &::before {
              width: 24px;
              height: 6px;
              background-color: #f4ed7a;
            }
          }
        }
      }
    }

    /* arrow customizing */
    .slick-arrow {
      width: 45px;
      height: 45px;
      background-size: contain;
      background-position: center;
      opacity: 0.7;

      &:before {
        display: none;
      }

      &.slick-prev {
        left: -50px;
        background-image: url('https://image.flaticon.com/icons/svg/109/109617.svg');
        transform: rotate(-180deg);
      }
      &.slick-next {
        right: -50px;
        background-image: url('https://image.flaticon.com/icons/svg/109/109617.svg');
        transform: rotate(0);
      }
    }
  }
`

const Slide = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10em;
  font-weight: bold;
  color: #fff;

  &:nth-child(1) {
    background: blue;
  }
  &:nth-child(2) {
    background: red;
  }
  &:nth-child(3) {
    background: yellow;
  }
`

/**
 * 최근 리뷰 슬라이더
 * 3개씩 표시된다
 */
export default function ReviewSlide() {
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots',
  }

  return (
    <Wrap>
      <Slider {...sliderSettings}>
        <div>
          <Slide>1</Slide>
        </div>
        <div>
          <Slide>2</Slide>
        </div>
        <div>
          <Slide>3</Slide>
        </div>
      </Slider>
    </Wrap>
  )
}
