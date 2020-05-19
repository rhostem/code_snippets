import React from 'react'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import SlideIn, { slideInDirections } from '../../common/SlideIn'

export default {
  title: 'common/SlideIn',
  decorators: [withKnobs],
}

export const Default = () => (
  <div>
    <h1>Control knobs to see SlideIn</h1>
    <SlideIn
      isIn={boolean('isIn', false)}
      direction={select(
        'direction',
        Object.keys(slideInDirections).map((k) => slideInDirections[k]),
        slideInDirections.RIGHT
      )}
      duration={number('duration', 400)}
      zIndex={number('zIndex', 1000)}
      easing={select(
        'easing',
        [
          'linear',
          'cubicBezier(.5, .05, .1, .3)',
          'easeInQuad',
          'easeInCubic',
          'easeInQuart',
          'easeInQuint',
          'easeInSine',
          'easeInExpo',
          'easeInCirc',
          'easeInBack',
          'easeInBounce',
          'easeInOutQuad',
          'easeInOutCubic',
          'easeInOutQuart',
          'easeInOutQuint',
          'easeInOutSine',
          'easeInOutExpo',
          'easeInOutCirc',
          'easeInOutBack',
          'easeInOutBounce',
          'easeOutQuad',
          'easeOutCubic',
          'easeOutQuart',
          'easeOutQuint',
          'easeOutSine',
          'easeOutExpo',
          'easeOutCirc',
          'easeOutBack',
          'easeOutBounce',
        ],
        'easeInQuad'
      )}
    >
      <div
        style={{
          width: '500px',
          background: '#580E8B',
          color: '#fff',
          padding: '20px',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
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
