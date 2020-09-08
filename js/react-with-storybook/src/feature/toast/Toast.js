import * as React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 280px;
  padding: 20px;
  font-size: 16.5px;
  line-height: 1.45;
  text-align: center;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
`

function ToastMessage({ contents }) {
  return <Wrap>{contents}</Wrap>
}

export default ToastMessage
