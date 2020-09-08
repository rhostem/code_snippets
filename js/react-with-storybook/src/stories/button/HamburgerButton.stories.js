import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import HamburgerButton from '../../button/HamburgerButton'

export default {
  title: 'button/HamburgerButton',
  decorators: [withKnobs],
}

export const Default = () => (
  <HamburgerButton isOn={boolean('isOn', false)}></HamburgerButton>
)
