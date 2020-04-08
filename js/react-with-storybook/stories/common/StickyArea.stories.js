import React from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import StickyArea from '../../common/StickyArea'
import styled from 'styled-components'

export default {
  title: 'common/StickyNavbar',
  decorators: [withKnobs],
}

const Wrap = styled.div`
  position: relative;
  background: #b8c9d9;
  min-height: 300vh;
`

export const Default = () => {
  return (
    <Wrap>
      <div
        style={{
          width: '100%',
          height: '50vh',
          background: 'green',
        }}></div>

      <StickyArea isFixed={boolean('isFixed', false)}></StickyArea>

      <div
        style={{
          width: '100%',
          height: '50vh',
          background: 'blue',
        }}></div>
    </Wrap>
  )
}
