import React, { useState, useRef, useCallback } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

export default {
  title: 'hooks/useIntersectionObserver',
  decorators: [withKnobs],
}

export const Default = () => {
  const targetRef = useRef(null)

  const [bgColor, setBgColor] = useState('#fff')

  const handleOnVisible = useCallback(entry => {
    console.log(`on intersect: entry`, entry)
    setBgColor('#FBF8CA')
  }, [])

  const handleOnUnvisible = useCallback(entry => {
    setBgColor('#fff')
  }, [])

  useIntersectionObserver({
    targetRef,
    onVisible: handleOnVisible,
    onUnvisible: handleOnUnvisible,
    isTriggerOnlyOnce: true,
  })

  return (
    <div>
      <div
        style={{
          height: '110vh',
          background: bgColor,
        }}
      >
        scroll down to trigger intersection observer
      </div>

      <div
        ref={targetRef}
        style={{
          minHeight: '200px',
          background: '#efefef',
        }}
      >
        intersecting area
      </div>
    </div>
  )
}
