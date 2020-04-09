import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import SlideIn, { slideDirections } from '../../common/SlideIn'

export default {
  title: 'common/SlideIn',
  decorators: [withKnobs],
}

export const Default = () => (
  <SlideIn
    isVisible={boolean('isVisible', false)}
    direction={select(
      'direction',
      Object.keys(slideDirections).map((k) => slideDirections[k]),
      slideDirections.LEFT
    )}
    zIndex={number('zIndex', null)}>
    <div style={{ width: '300px', margin: '0 auto', background: '#eee' }}>
      <h1>title</h1>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est, nam,
      dolores iure vel consequuntur cumque asperiores itaque possimus adipisci
      veritatis incidunt ipsam hic quidem. Quo, cupiditate quidem! Recusandae,
      at! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quas
      excepturi sed at? Ipsam molestiae possimus nobis doloribus dolorum eveniet
      deserunt voluptatibus facere ullam, repudiandae, quod, ab magnam sit minus
      fuga! Vitae fugiat iusto eius earum nam facilis rem ex, ducimus quae
      consequatur ratione quod autem
    </div>
  </SlideIn>
)
