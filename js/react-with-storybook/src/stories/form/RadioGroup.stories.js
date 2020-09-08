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
import RadioGroup from '../../form/RadioGroup'

export default {
  title: 'form/RadioGroup',
  decorators: [withKnobs],
}

export const Default = () => {
  const [selected, setSelected] = useState('2')
  const onChange = e => {
    console.log(`e.target.checked`, e.target.value)
    if (e.target.checked) {
      setSelected(e.target.value)
    }
  }

  return (
    <div>
      <h2>text</h2>
      <RadioGroup>
        <input
          id="radio-1"
          type="radio"
          name="unique"
          value="1"
          checked={selected === '1'}
          onChange={onChange}
        />
        <label htmlFor="radio-1">라벨1</label>
        <input
          id="radio-2"
          type="radio"
          name="unique"
          value="2"
          checked={selected === '2'}
          onChange={onChange}
        />
        <label htmlFor="radio-2">라벨2</label>
      </RadioGroup>

      <h2>input</h2>
      <RadioGroup>
        <input
          id="radio-1"
          type="radio"
          name="radioInput"
          value="1"
          checked={selected === '1'}
          onChange={onChange}
        />
        <label htmlFor="radio-1">
          <input type="text" />
        </label>
        <input
          id="radio-2"
          type="radio"
          name="radioInput"
          value="2"
          checked={selected === '2'}
          onChange={onChange}
        />
        <label htmlFor="radio-2" style={{ clear: 'left', marginTop: '10px' }}>
          <input type="text" />
        </label>
      </RadioGroup>
    </div>
  )
}
