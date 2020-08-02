import React from 'react'
import styled from 'styled-components'

const Wrap = styled.button`
  padding: 10px;
  border: none;
  appearance: none;
  outline: none;
`

const Bars = styled.div`
  display: flex;
  flex-direction: column;
  height: 18px;
  justify-content: space-between;
  align-items: center;

  & > span {
    display: block;
    width: 24px;
    height: 3px;
    background: #24497b;
  }

  &.isOn {
    /* TODO: On 전환 효과 */
  }
`

export default function HamburgerButton({ onClick, isOn }) {
  return (
    <Wrap onClick={onClick}>
      <Bars className={isOn ? 'isOn' : null}>
        <span></span>
        <span></span>
        <span></span>
      </Bars>
    </Wrap>
  )
}
