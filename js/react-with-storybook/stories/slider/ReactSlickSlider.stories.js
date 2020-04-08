import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import ReactSlickSlider from '../../slider/ReactSlickSlider'

export default {
  title: 'slider/ReactSlickSlider',
  decorators: [withKnobs],
}

export const Default = () => <ReactSlickSlider></ReactSlickSlider>
