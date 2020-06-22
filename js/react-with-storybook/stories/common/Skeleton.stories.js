import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import styled, { css } from 'styled-components'
import skeleton from '../../style/skeleton'

export default {
  title: 'common/Skeleton',
  decorators: [withKnobs],
}

export const Default = () => {
  return (
    <div>
      <h2>skeleton line</h2>
      <div
        css={`
          ${skeleton({ trackWidth: '300px' })};
          width: 300px;
          height: 20px;
        `}
      ></div>

      <h2>skeleton avatar</h2>
      <div
        css={`
          ${skeleton({ trackWidth: '100px', borderRadius: '50%' })};
          width: 80px;
          height: 80px;
          border-radius: 50%;
        `}
      ></div>

      <h2>color (with knob)</h2>
      <div
        css={`
          ${skeleton({
            trackWidth: '300px',
            shiningColor: text('shiningColor', '#F5EB6F'),
            baseColor: text('baseColor', '#2E4FD0'),
            duration: number('duration', 1.5),
          })};
          width: 300px;
          height: 20px;
        `}
      ></div>
    </div>
  )
}
