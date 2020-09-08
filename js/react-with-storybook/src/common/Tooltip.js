import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  top: calc(100% + 1em);
  width: 400px;
  height: auto;
  padding: 16px;
  font-size: 14px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 10px 10px 30px 0 rgba(76, 103, 140, 0.2);
`

export default function Tooltip({ isOpen, wrapperCSS, style, children }) {
  return isOpen ? (
    <Wrap css={wrapperCSS} style={style}>
      {children}
    </Wrap>
  ) : null
}
