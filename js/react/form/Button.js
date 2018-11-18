import React from 'react'
import styled from 'styled-components'
import { pTr } from '../../styles/typography'

const Wrap = styled.div`
  width: ${({ width }) => (width ? width : '100%')};
  margin: 0 auto;
`

const ButtonInner = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ height }) => (height ? height : pTr(57))};
  padding: 0;
  margin: 0 auto;
  border-radius: ${pTr(3)};
  border: solid ${pTr(1)} #d8d8d8;
  font-size: ${pTr(20)};
  color: #fff;
  background-color: #1f5de6;
`

type Style = {
  width: string,
  height: string,
  color: string,
  backgroundColor: string,
}

export default ({
  onClick = () => {},
  style = {},
  children,
}: {
  onClick: Function,
  style: Style,
  children: React.Component | null,
}) => {
  return (
    <Wrap width={style.width} onClick={onClick}>
      <ButtonInner style={{ ...style }}>{children}</ButtonInner>
    </Wrap>
  )
}
