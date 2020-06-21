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
import Input from '../../form/Input'

export default {
  title: 'form/Input',
  decorators: [withKnobs],
}

export const Default = () => (
  <Input
    placeholder="플레이스홀더"
    icon={select(
      'inputicon',
      ['PASSWORD', 'ID', ''],
      'PASSWORD' // default
    )}
    style={{
      height: '50px',
    }}
    onChange={e => console.log(e.target.value)}
  />
)
