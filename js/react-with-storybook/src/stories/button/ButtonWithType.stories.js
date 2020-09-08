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
import ButtonWithType, { buttonTypes } from '../../button/ButtonWithType'

export default {
  title: 'button/ButtonWithType',
  decorators: [withKnobs],
}

export const Default = () => {
  return (
    <div>
      <ButtonWithType
        style={object('style', {
          width: '300px',
          height: '70px',
          fontSize: '20px',
          fontWeight: 'bold',
          borderWidth: '3px',
        })}
        type={select(
          'type',
          Object.keys(buttonTypes).reduce((values, type) => {
            values.push(buttonTypes[type])
            return values
          }, [])
        )}
      >
        button text
      </ButtonWithType>
      <p>can change button color with Knobs</p>
    </div>
  )
}
