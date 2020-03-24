import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { mixin } from 'styles'

const MODAL_BODY_WIDTH = '500px'

const ModalBody = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: ${MODAL_BODY_WIDTH};
  flex-direction: column;
  padding: 60px 55px;
  border: none;
  background-color: #fff;
  font-size: 16px;
`

export const AlertWrap = styled.div`
  ${mixin.fixedCenter()};
  width: 540px;
  background-color: #424242;
  z-index: 2000;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
`

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 0;
  /* margin-bottom: 85px; */
  /* min-height: 194px; */
`

export const AlertButtons = styled.div`
  width: 100%;
  text-align: center;
  bottom: 48px;
  margin-top: 32px;

  button {
    display: inline-block;
    width: 190px;
    color: #ffffff;
    background-color: #1f5de6;
    padding: 15px;
    border: none;
    font-size: 16px;

    &:nth-child(2n) {
      margin-left: 10px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`

const AlertBtns = ({ onConfirm, confirmText }) => (
  <AlertButtons>
    <button onClick={onConfirm}>{confirmText || '확인'}</button>
  </AlertButtons>
)

const ConfirmBtns = ({ onCancel, onConfirm, confirmText, cancelText }) => (
  <AlertButtons>
    <button onClick={onConfirm}>{confirmText || '확인'}</button>
    <button
      onClick={onCancel}
      style={{ backgroundColor: '#2b2b2b', color: '#fff' }}>
      {cancelText || '취소'}
    </button>
  </AlertButtons>
)

type Props = {
  isOpen: boolean,
  isConfirm: boolean, // alert인지 confirm인지
  onConfirm: Function, // 확인 버튼 콜
  onCancel: Function, // 취소 버튼 콜
  onJustClose: Function, // 확인, 취소 누르지 않고 닫기
  contentStyle?: Object,
  content: string, // modal body에 들어갈 내용. React component, HTML 시용 가능
  children: React.component, // children이 있으면 content 무시
  isButtonVisible: boolean, // 기본 버튼 표시 여부
  confirmText: string, // 확인 버튼 텍스트
  cancelTest: string, // 취소 버튼 텍스트
}
class Alert extends React.Component<Props, null> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  get modalBody() {
    const { content } = this.props
    return typeof content === 'function' ? content() : content
  }

  render() {
    const {
      isOpen,
      onJustClose,
      contentStyle,
      isButtonVisible = true,
      body,
      content,
    } = this.props

    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="react_my_modal"
        onRequestClose={onJustClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10000,
          },
          content: {
            top: '50%',
            left: '50%',
            bottom: 'initial',
            right: 'initial',
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            padding: 0,
            overflow: 'hidden',
            border: 'solid 3px #394e7e',
            ...contentStyle,
          },
        }}
        closeTimeoutMS={400}>
        <ModalBody>
          {this.props.children ? (
            <AlertBody>{this.props.children}</AlertBody>
          ) : (
            <>
              {typeof content === 'function' ? ( // if react component
                <AlertBody>{content()}</AlertBody>
              ) : (
                <AlertBody
                  dangerouslySetInnerHTML={{ __html: this.modalBody }}
                />
              )}

              {isButtonVisible &&
                (!this.props.isConfirm ? (
                  <AlertBtns {...this.props} />
                ) : (
                  <ConfirmBtns {...this.props} />
                ))}
            </>
          )}
        </ModalBody>
      </ReactModal>
    )
  }
}

export default Alert
