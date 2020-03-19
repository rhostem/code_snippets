// @flow
import * as React from 'react'
import styled from 'styled-components'

const Layer = styled.div`
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.3;
`

type Props = {
  opacity: number,
}

function DimmedLayer(props: Props) {
  const opacity = props.opacity || 0.3
  return <Layer style={{ opacity }} />
}

export default DimmedLayer
