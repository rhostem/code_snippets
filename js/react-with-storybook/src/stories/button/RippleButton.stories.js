import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import RippleButton from '../../button/RippleButton'

export default {
  title: 'button/RippleButton',
  decorators: [withKnobs],
}

export const Default = () => <RippleButton></RippleButton>
