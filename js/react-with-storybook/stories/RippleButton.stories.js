import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import RippleButton from '../common/RippleButton'

export default {
  title: 'common/RippleButton',
  decorators: [withKnobs],
}

export const Default = () => <RippleButton></RippleButton>
