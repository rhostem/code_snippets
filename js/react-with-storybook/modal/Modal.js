import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

export const DefaultBody = styled.div`
  width: 480px;
  height: 600px;
`

export const DefaultContents = styled.div`
  padding: 1rem;
  background: #fff;
`

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
        closeTimeoutMS={400}>
        {this.props.children}
      </ReactModal>
    )
  }
}

export default Modal
