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
import SortableContainer from '../components/sortable/SortableContainer'
import { withReactDnd } from './decorators'
import styled from 'styled-components'

const stories = storiesOf('SortableContainer', module).addDecorator(
  withReactDnd
)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)
stories.addDecorator(withKnobs)

const ItemWrap = styled.div`
  margin: 0.5rem 0;
  padding: 1rem;
  border: 1px solid #333;
`

stories.add('default', () => {
  return (
    <SortableContainer
      onUpdateList={list => console.log('onUpdateList', list)}
      initialList={[
        {
          id: 1,
          canDrag: true,
          children: () => (
            <ItemWrap>
              장기 재테크를 위해 보험을 활용하려고 한다. 수익률을 우선하기
              위해서는 어떤 보험을 선택하면 좋을까?
            </ItemWrap>
          ),
        },
        {
          id: 2,
          canDrag: false,
          children: () => (
            <ItemWrap>
              <b>canDrag: false</b>
            </ItemWrap>
          ),
        },
        {
          id: 3,
          canDrag: true,
          children: () => (
            <ItemWrap>
              안정적인 재테크를 위해 선택하는 보험으로, 공시이율에 복리이자가
              더해지는 보험은?
            </ItemWrap>
          ),
        },
        {
          id: 4,
          canDrag: true,
          children: () => (
            <ItemWrap>
              연령/성별에 따라 사망이나 장애 등을 일으키는 원인은 미리 알 수
              있다.
            </ItemWrap>
          ),
        },
      ]}
      onDropItem={item => {
        console.log(`onDropItem`, item)
      }}
    />
  )
})
