import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
  object,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Tooltip from '../../common/Tooltip'
import useToggle from '../../hooks/useToggle'

export default {
  title: 'Tooltip',
  decorators: [withKnobs],
}

export const OpenByButton = () => {
  const [isOpen, toggle] = useToggle()

  return (
    <div
      css={`
        position: relative;
      `}
    >
      <p>click button to show Tooltip</p>
      <span
        css={`
          position: relative;
        `}
      >
        <button onClick={toggle}>show Tooltip</button>
        <Tooltip
          isOpen={isOpen}
          style={object('style', { width: '400px', top: '100%' })}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          facere veritatis iusto! Atque eos accusantium explicabo, non ipsa iste
          quae illo eius est! Inventore earum, perspiciatis sequi vel nemo
          ducimus!
        </Tooltip>
      </span>
    </div>
  )
}
