import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import styled from 'styled-components'
import useMouseZoom from '../../hooks/useMouseZoom'

export default {
  title: 'hooks/useMouseZoom',
  decorators: [withKnobs],
}

const Wrap = styled.div`
  width: 800px;
  height: 800px;
  background-color: #eee;
  overflow: hidden;
`

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
`

export const Default = () => {
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const {
    distance,
    zoom,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMouseWheel,
    handleMouseOut,
  } = useMouseZoom({ imageWrapperRef })

  return (
    <Wrap
      ref={imageWrapperRef}
      draggable={false}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
      onWheel={handleMouseWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <ImageWrap
        draggable={false}
        style={{
          backgroundImage: 'url(http://lorempixel.com/480/853/people)',
          transform: `translate3d(${distance.x}px, ${distance.y}px, 0) scale(${zoom})`,
        }}
      ></ImageWrap>
    </Wrap>
  )
}
