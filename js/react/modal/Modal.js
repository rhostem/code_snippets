import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { pTr } from '../../styles/typography'

export const DefaultBody = styled.div`
  width: calc(100vw - ${pTr(40)});
  height: calc(100vh - ${pTr(90)});
`

export const DefaultContents = styled.div`
  font-size: ${pTr(14)};
  padding: 20px;
  background: #fff;
`

type Props = {
  isOpen: boolean,
  onClose: Function, // 확인, 취소 누르지 않고 닫기
  contentStyle?: Object,
  children: React.component, // children이 있으면 content 무시
}
class Modal extends React.Component<Props, State> {
  render() {
    const { isOpen, onClose, contentStyle } = this.props

    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="defaultModal"
        onRequestClose={onClose}
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
            ...contentStyle,
          },
        }}
        closeTimeoutMS={400}
      >
        {this.props.children}
      </ReactModal>
    )
  }
}

export default Modal
