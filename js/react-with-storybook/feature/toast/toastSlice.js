import { createSlice } from '@reduxjs/toolkit'

declare type IToast = {
  contents: string,
}

declare type IToastState = {
  queue: IToast[],
}

const initialState: IToastState = {
  queue: [],
}

const toastSlice = createSlice({
  name: 'toastSlice',
  initialState,
  reducers: {
    pushToast: (state, { payload }: IAction<Toast>) => {
      state.queue.push(payload)
    },
    popToast: state => {
      state.queue.pop()
    },
  },
})

export const { pushToast, popToast } = toastSlice.actions

const TOAST_DISPLAY_DURATION = 2000

export const showToast = (toast: IToast) => dispatch => {
  dispatch(pushToast(toast))

  setTimeout(() => {
    dispatch(popToast())
  }, TOAST_DISPLAY_DURATION)
}

export default toastSlice
