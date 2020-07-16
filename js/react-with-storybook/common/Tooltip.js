import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  padding: 2em;
  border-radius: 10px;
  background: #fff;
  box-shadow: 10px 10px 30px 0 rgba(76, 103, 140, 0.2);
  width: 400px;
  height: auto;
`

export default function Tooltip({ isOpen, wrapperCSS, style, children }) {
  return (
    isOpen && (
      <Wrap css={wrapperCSS} style={style}>
        {children}
      </Wrap>
    )
  )
}
