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
import Alert from 'components/modal/Alert'

const stories = storiesOf('Alert', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('default', () => {
  return (
    <Alert
      isOpen={boolean('isOpen', true)}
      isConfirm={boolean('isConfirm', true)}
      content={text('content', 'loream')}
      i18nKey={boolean('i18nKey', true)}
      onConfirm={() => alert('confirm')}
      onCancel={() => alert('onCancel')}
      onJustClose={() => {}}
      contentStyle={{}}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
      laudantium tenetur inventore sequi rem illo repudiandae impedit
      recusandae, culpa, corporis ea ipsam porro perspiciatis sit distinctio
      veritatis. At, nobis corrupti.
    </Alert>
  )
})
