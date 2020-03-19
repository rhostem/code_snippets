import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import RippleButton from '../common/RippleButton'

const stories = storiesOf('RippleButton', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('default', () => {
  return <RippleButton></RippleButton>
})
