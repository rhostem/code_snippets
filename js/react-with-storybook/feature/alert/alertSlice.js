import { createSlice } from '@reduxjs/toolkit'

declare type IAlertData = {
  contents: string,
  html?: null,
  isCancelVisible?: boolean,
  confirmText?: string,
  cancelText?: string,
  onConfirm: Function,
}

const initialState = {
  // isVisible: true,
  // FIXME:
  isVisible: false,

  data: {
    contents: '',
    detail: null,
    html: null,
    confirmText: '확인',
    cancelText: '취소',
    isCancelVisible: false,
    onConfirm: () => undefined,
    wrapperCSS: null,
  },
}

const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    showAlert: (state, { payload = {} }: IAction<IAlertData>) => {
      const {
        isCancelVisible,
        contents,
        detail,
        html,
        confirmText,
        cancelText,
        onConfirm,
        wrapperCSS,
      } = payload

      if (!contents && !html) {
        console.warn('Alert 내용이 없습니다')
        state.isVisible = false
      } else {
        state.data = {
          contents,
          detail,
          html,
          isCancelVisible: isCancelVisible,
          confirmText: confirmText || '확인',
          cancelText: cancelText || '취소',
          wrapperCSS: wrapperCSS,
        }

        // onConfirm은 확인 버튼 클릭 콜백.
        // NOTE: Redux는 payload에 함수를 넣지 말라는 에러를 표시한다. 하지만 undo같은 기능을 사용할 것이 아니므로 무시해도 사용관없음.
        if (!!onConfirm && typeof onConfirm) {
          state.data.onConfirm = onConfirm
        }

        state.isVisible = true
      }
    },
    closeAlert: (state) => {
      state.isVisible = false
      state.data = {}
    },
  },
})

export const { showAlert, closeAlert } = alertSlice.actions

export default alertSlice

/**

{
  type: 'alertSlice/showAlert',
  payload: {
    detail: '내용 텍스트 내용 텍스트 내용 텍스트 내용 텍스트 내용 텍스 트 내용 텍스트 내용 텍스트 내용 텍스트 내용 텍스트 내용 텍 스트  내용 텍스트 내용 텍스트 ',
    contents: '리뷰가 수정되었습니다'
  }
}

 */
