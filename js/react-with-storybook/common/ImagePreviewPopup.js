import React from 'react'
import ReactModal from 'react-modal'
import styled, { css } from 'styled-components'
import { center, centerX } from 'styles/mixin/centered'

const Wrap = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 80vw;
  width: 720px;
  height: 720px;

  img {
    z-index: 1;
    ${center()}
    width: 100%;
    height: auto;
  }
`

const CloseButton = styled.button`
  ${centerX()}
  z-index: 2;
  bottom: -90px;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.8) url('/static/images/common/close_x.png')
    0 0 no-repeat;
  background-size: contain;
`

export default function ImagePreviewPopup({ isOpen, url, onClose }) {
  return (
    <ReactModal
      parentSelector={() => document.querySelector('#modalRoot')}
      isOpen={isOpen}
      id="AlertModal"
      contentLabel="AlertModal"
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 20000,
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          bottom: 'initial',
          right: 'initial',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          padding: 0,
          overflow: 'initial',
          border: 'none',
          maxHeight: '95vh',
          borderRadius: '30px',
        },
      }}>
      <Wrap>
        <CloseButton onClick={onClose} css={css``}></CloseButton>
        <img src={url} alt={'preview'} />
      </Wrap>
    </ReactModal>
  )
}
