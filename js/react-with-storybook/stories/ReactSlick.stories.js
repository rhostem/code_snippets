import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import ReactSlick from '../slider/ReactSlick'

export default {
  title: 'ReactSlick',
  decorators: [withKnobs],
}

export const Default = () => <ReactSlick></ReactSlick>
