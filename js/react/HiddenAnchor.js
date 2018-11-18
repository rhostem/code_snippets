import React from 'react'
import styled from 'styled-components'

const HiddenAnchorWrap = styled.a`
  display: block;
  height: 0;
  width: 0;
  font-size: 0;
`

export function HiddenAnchor({ name }) {
  return (
    <HiddenAnchorWrap id={name} name={name}>
      <span>{name}</span>
    </HiddenAnchorWrap>
  )
}
