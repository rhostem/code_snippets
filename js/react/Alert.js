// @flow
import * as React from 'react'
import styled from 'styled-components'
import styles from '../../styles'
import FadeIn from '../FadeIn'
import DimmedLayer from '../DimmedLayer'

const borderRadius = '2px'

export const AlertWrap = styled.div`
  ${styles.mixin.centeredFixed()}
  width: 540px;
  border-radius: ${borderRadius};
  background-color: #424242;
  z-index: 2000;
  font-size: 16px;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
`

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  text-align: center;
  font-size: 20px;
  padding: 32px;
  margin-bottom: 85px;
  min-height: 194px;
`

export const Buttons = styled.div`
  ${styles.mixin.centeredX()};
  width: 100%;
  text-align: center;
  bottom: 48px;
`

export const Button = styled.button`
  display: inline-block;
  width: 160px;
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background-color: ${props =>
    props.primary ? styles.color.primary : '#5f5f5f'};
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.24), 0 0 8px 0 rgba(0, 0, 0, 0.12);
  border-radius: ${borderRadius};

  &:not(:first-child) {
    margin-left: 1rem;
  }

  &:hover {
    cursor: pointer;
  }
`

type BtnType = 'primary' | 'default'

type Props = {
  open: boolean,
  isConfirm: boolean,
  btnType?: BtnType,
  onConfirm?: Function,
  onCancel?: Function,
  children: React.ComponentElement,
}
type State = {}

class Alert extends React.Component {
  props: Props
  state: State

  static defaultProps = {
    onConfirm: () => {},
  }

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const AlertBtns = () =>
      <Buttons>
        <Button
          primary={this.props.btnType === 'primary'}
          onClick={this.props.onConfirm}
        >
          확인
        </Button>
      </Buttons>

    const ConfirmBtns = () =>
      <Buttons>
        <Button onClick={this.props.onCancel}>취소</Button>
        <Button primary onClick={this.props.onConfirm}>
          확인
        </Button>
      </Buttons>

    return (
      <div>
        <FadeIn in={this.props.open} duration={200}>
          <AlertWrap>
            <AlertBody>
              {this.props.children}
            </AlertBody>
            {this.props.isConfirm ? <ConfirmBtns /> : <AlertBtns />}
          </AlertWrap>
          <DimmedLayer />
        </FadeIn>
      </div>
    )
  }
}

export default Alert
