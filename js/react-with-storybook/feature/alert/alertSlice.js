import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isVisible: false,

  data: {
    contents: '',
    html: null,
    confirmText: '확인',
    cancelText: '취소',
    isCancelVisible: false,
    onConfirm: () => undefined,
  },
}

const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    showAlert: (state, { payload }: IAction<IAlertData>) => {
      const {
        isCancelVisible,
        contents,
        html,
        confirmText,
        cancelText,
        onConfirm,
      } = payload

      if (!contents && !html) {
        console.warn('Alert 내용이 없습니다')
        state.isVisible = false
      } else {
        state.data.contents = contents
        state.data.html = html
        state.data.isCancelVisible = isCancelVisible
        state.data.confirmText = confirmText || '확인'
        state.data.cancelText = cancelText || '취소'

        if (typeof onConfirm !== 'function') {
          console.warn('onConfirm 값이 함수가 아닙니다.')
        } else {
          state.data.onConfirm = onConfirm
        }

        state.isVisible = true
      }
    },
    closeAlert: state => {
      state.isVisible = false
    },
  },
})

export const { showAlert, closeAlert } = alertSlice.actions

export default alertSlice
