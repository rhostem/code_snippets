import React from 'react'
import styled from 'styled-components'
// import scrollbar from 'styles/mixin/scrollbar'
// import { UNDER_TABLET } from 'styles/mixin/media'
// import { center } from 'styles/mixin/centered'
import ReactModal from 'react-modal'

// 디바이스의 촤대 크기
export const breakPoints = {
  IPHONE5: '320px',
  MOBILE: '480px',
  TABLET: '768px ',
  DESKTOP: '1600px',
  LARGE_DESKTOP: '1920px',
}
export const UNDER_TABLET = `@media (max-width: ${breakPoints.TABLET})`

export const MODAL_ZINDEX = 9999

export const commonReactModalOverayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: MODAL_ZINDEX,
}

export const commonReactModalContentStyle = {
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
}

// 모바일에서는 풀 커버 스타일의 모달이 된다.
export const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 760px; /* FIXME: */
  background: #fff;
  border-radius: 30px;
  padding: 68px 30px 105px;
  max-height: 100%;
  z-index: 100;
  line-height: 1.5;
  letter-spacing: -0.7px;
  text-align: left;
  color: #174b7d;
  overflow: hidden;

  ${UNDER_TABLET} {
    border-radius: 0;
    width: 100%;
    height: 100%;
  }
`

export const ModalScrollContents = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`
/* ${scrollbar({
      width: 0,
      trackColor: 'transparent',
      thunmbColor: 'transparent',
    })}; */

export const ModalTitle = styled.div`
  font-size: 24px;
  line-height: 1.35;
  letter-spacing: normal;
  text-align: left;
  color: #174b7d;
  margin-bottom: 18px;
`

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: url('/images/common/close_x.png') no-repeat center;
  background-size: cover;
  width: 35px;
  height: 35px;
`

const SubmitButtonWrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  z-index: 100;

  button {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    font-size: 19px;
    border: none;

    &.cancel {
      background-color: #f4f6f8;
      color: #8b8c8a;
    }

    &.submit {
      color: #fff;
      background-color: #174b7d;
    }
  }
`

/**
 * 저장, 취소 버튼
 * @param {*} param0
 */
export const SubmitButtons = ({
  onClose,
  onSubmit,
  isSubmitDisabled,
  cancelText = '취소',
  submitText = '저장',
  wrapperCSS,
}) => {
  return (
    <SubmitButtonWrap css={wrapperCSS}>
      <button className={'cancel'} type="button" onClick={onClose}>
        {cancelText}
      </button>
      <button className={'submit'} type="submit" disabled={isSubmitDisabled}>
        {submitText}
      </button>
    </SubmitButtonWrap>
  )
}

export function CommonModal({
  isOpen,
  onClose,
  children,
  bodyStyle = {},
  bodyCSS,
  ...rest
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      id="ReactModalAlert"
      onRequestClose={onClose}
      style={{
        overlay: commonReactModalOverayStyle,
        content: commonReactModalContentStyle,
      }}
      ariaHideApp={false}
      {...rest}>
      <ModalBody style={bodyStyle} css={bodyCSS}>
        {children}
      </ModalBody>
    </ReactModal>
  )
}
