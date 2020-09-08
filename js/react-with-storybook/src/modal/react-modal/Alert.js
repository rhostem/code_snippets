import React, { useCallback } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

const Body = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  padding: 30px;
  background: #fff;
  border-radius: 30px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    top: initial;
    left: 0;
    bottom: 0;
    transform: none;
    border-radius: 30px 30px 0 0;
    border-bottom: none;
  }
`

const Contents = styled.div`
  font-size: 18px;
  letter-spacing: -0.83px;
  text-align: left;
  color: #174b7d;
  margin-bottom: 13px;

  .detail {
    font-size: 14px;
    line-height: 1.43;
    letter-spacing: -0.7px;
    text-align: left;
    color: #666666;
    margin-top: 18px;
  }
`

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

export default function Alert({
  isOpen,
  onClose,
  modalData = {
    html: null,
    contents: null, // 본문. 제목(detail이 있을 때)
    detail: null, // 상세 텍스트
    isCancelVisible: false,
    cancelText: '취소',
    confirmText: '확인',
    onConfirm: () => {},
  },
}) {
  const {
    html,
    contents,
    detail,
    isCancelVisible,
    cancelText,
    confirmText,
    onConfirm,
  } = modalData

  const handleConfirm = useCallback(() => {
    if (typeof onConfirm === 'function') {
      onConfirm()
    } else {
      onClose()
    }
  }, [onClose, onConfirm])

  return (
    <ReactModal
      isOpen={isOpen}
      id="ReactModalAlert"
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          borderRadius: '0',
          outline: 'none',
          padding: '0',
        },
      }}>
      <Body>
        {/* html 마크업이 있으면 표시한다. */}
        {!!html ? (
          <Contents dangerouslySetInnerHTML={{ __html: html }}></Contents>
        ) : (
          <Contents>
            {contents}

            {detail && <div class="detail">{detail}</div>}
          </Contents>
        )}

        <Buttons>
          {isCancelVisible && (
            <button className="cancel" onClick={onClose}>
              {cancelText}
            </button>
          )}

          <button onClick={handleConfirm}>{confirmText}</button>
        </Buttons>
      </Body>
    </ReactModal>
  )
}
