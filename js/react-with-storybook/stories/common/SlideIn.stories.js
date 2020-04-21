import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import SlideIn, { slideInDirections } from '../../common/SlideIn'

export default {
  title: 'common/SlideIn',
  decorators: [withKnobs],
}

export const Default = () => (
  <div>
    control knobs to show slidein
    <SlideIn
      isIn={boolean('isIn', false)}
      direction={select(
        'direction',
        Object.keys(slideInDirections).map((k) => slideInDirections[k]),
        slideInDirections.LEFT
      )}
      zIndex={number('zIndex', null)}>
      <div style={{ width: '100%', margin: '0 auto', background: '#efefef' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere est,
        nam, dolores iure vel consequuntur cumque asperiores itaque possimus
        adipisci veritatis incidunt ipsam hic quidem. Quo, cupiditate quidem!
        Recusandae, at! Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Commodi quas excepturi sed at? Ipsam molestiae possimus nobis
        doloribus dolorum eveniet deserunt voluptatibus facere ullam,
        repudiandae, quod, ab magnam sit minus fuga! Vitae fugiat iusto eius
        earum nam facilis rem ex, ducimus quae consequatur ratione quod autem
      </div>
    </SlideIn>
  </div>
)
