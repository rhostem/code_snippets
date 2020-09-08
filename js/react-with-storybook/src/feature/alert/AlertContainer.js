import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { closeAlert } from './alertSlice'

export const ModalBody = styled.div`
  position: relative;
  width: 480px;
  background: #fff;
  border-radius: 30px;
  padding: 68px 30px 68px;
  max-height: 95vh;
  z-index: 100;
  line-height: 1.5;
  letter-spacing: -0.7px;
  text-align: left;
  color: #174b7d;
`

const Body = styled(ModalBody)`
  width: 280px;
  padding: 30px;
`

const Contents = styled.div``

const Buttons = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    border-radius: 20px;
    background-color: #24497b;
    color: #fff;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &.cancel {
      background: none;
      color: #8b8c8a;
    }
  }
`

export default function AlertContainer() {
  const dispatch = useDispatch()
  const { isVisible, data } = useSelector((state: IRootState) => state.alert)

  const handleClose = useCallback(() => {
    dispatch(closeAlert())
  }, [dispatch])

  const handleConfirm = useCallback(() => {
    if (typeof data.onConfirm === 'function') {
      data.onConfirm()
    }

    dispatch(closeAlert())
  }, [data, dispatch])

  return (
    <ReactModal
      parentSelector={() => document.querySelector('#modalRoot')}
      ariaHideApp={false}
      isOpen={isVisible}
      id="AlertModal"
      contentLabel="AlertModal"
      onRequestClose={handleClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 10000,
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
          overflow: 'auto',
          border: 'none',
          maxHeight: '95vh',
          borderRadius: '30px',
        },
      }}>
      <Body>
        {/* html 마크업이 있으면 표시한다. */}
        {!!data.html ? (
          <Contents dangerouslySetInnerHTML={{ __html: data.html }}></Contents>
        ) : (
          <Contents>
            {typeof data.contents === 'function'
              ? data.contents() /* render JSX */
              : data.contents}
          </Contents>
        )}

        <Buttons>
          {data.isCancelVisible && (
            <button className="cancel" onClick={handleClose}>
              {data.cancelText}
            </button>
          )}
          <button onClick={handleConfirm}>{data.confirmText}</button>
        </Buttons>
      </Body>
    </ReactModal>
  )
}
