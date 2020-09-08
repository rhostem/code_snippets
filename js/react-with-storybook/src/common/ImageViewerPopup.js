import React, { useState, useCallback, useMemo, useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import Modal from '../modal/Modal'
import { center, centerY } from 'styles/mixin/centered'
import { UNDER_TABLET } from 'styles/mixin/media'
import circle from 'styles/mixin/circle'
import useImageLoader from 'components/hooks/useImageLoader'
import LoadingIndicator from 'components/common/LoadingIndicator'

const MODAL_ZINDEX = 9999

const Wrap = styled.div`
  ${center()};
  width: 700px;

  ${UNDER_TABLET} {
    max-width: 700px;
    width: 100vw;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: url('/images/common/close_x.png') no-repeat center;
  background-size: cover;
  width: 35px;
  height: 35px;
`

const ImageContainerWrap = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${UNDER_TABLET} {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    max-width: 600px;
    max-height: 600px;
  }
`

const ImageContainer = ({ url, children }) => {
  const [urlLoaded, isLoading] = useImageLoader(url)
  return (
    <ImageContainerWrap
      style={{
        backgroundImage: `url(${urlLoaded})`,
      }}
    >
      {children}
      {isLoading && <LoadingIndicator isAbsolute></LoadingIndicator>}
    </ImageContainerWrap>
  )
}

const SliderWrap = styled.div`
  position: relative;

  /* 기본 좌우버튼 제거 */
  .slick-arrow {
    display: none !important;
  }
`

const LeftButton = styled.button`
  ${centerY()}
  ${circle('45px')};
  z-index: 10;
  left: -50px;
  background: transparent url('/images/common/cramp_white_left.png') 0 0
    no-repeat;
  background-size: contain;

  ${UNDER_TABLET} {
    ${circle('35px')};
    left: 13px;
    background-color: rgba(0, 0, 0, 0.6);
  }
`

const RightButton = styled(LeftButton)`
  background-image: url('/images/common/cramp_white_right.png');
  left: initial;
  right: -50px;

  ${UNDER_TABLET} {
    left: initial;
    right: 13px;
  }
`

export default function ImageViewerPopup({ isOpen, onClose, imageUrls = [] }) {
  const isImageExists = useMemo(() => {
    return Array.isArray(imageUrls) && imageUrls.length > 0
  }, [imageUrls])

  const [index, setIndex] = useState(0)
  const sliderRef = useRef(null)
  const setSlider = useCallback(c => (sliderRef.current = c), [])

  const handleAfterChange = useCallback(newIndex => {
    setIndex(newIndex)
  }, [])

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: false,
      ref: setSlider,
      afterChange: handleAfterChange,
    }),
    [setSlider, handleAfterChange]
  )

  const handleClickLeft = useCallback(() => {
    sliderRef.current.slickPrev()
  }, [])

  const handleClickRight = useCallback(() => {
    sliderRef.current.slickNext()
  }, [])

  return (
    isImageExists && (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: MODAL_ZINDEX,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
        contentStyle={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          borderRadius: '0',
          outline: 'none',
          padding: '0',
        }}
      >
        <Wrap>
          <CloseButton
            onClick={onClose}
            css={`
              top: 0;
              right: 13px;
              background-image: url('/images/common/close_white_with_circle.png');
            `}
          ></CloseButton>
          <div
            css={`
              display: flex;
              height: 35px;
              align-items: center;
              justify-content: center;
              color: #fff;
              font-weight: bold;
              margin-bottom: 20px;
              font-size: 18px;
            `}
          >
            이미지 {index + 1}/{imageUrls.length}
          </div>

          <SliderWrap>
            <Slider {...sliderSettings}>
              {imageUrls.map((url, index) => {
                return <ImageContainer key={index} url={url}></ImageContainer>
              })}
            </Slider>
            <LeftButton onClick={handleClickLeft}></LeftButton>
            <RightButton onClick={handleClickRight}></RightButton>
          </SliderWrap>
        </Wrap>
      </Modal>
    )
  )
}
