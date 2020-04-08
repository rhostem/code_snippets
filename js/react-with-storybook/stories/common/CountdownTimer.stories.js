import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import CountdownTimer from '../../common/CountdownTimer'

export default {
  title: 'common/CountdownTimer',
  component: CountdownTimer,
  decorators: [withKnobs],
}

export const Default = () => {
  return <CountdownTimer initialTimeLeft={120} />
}
