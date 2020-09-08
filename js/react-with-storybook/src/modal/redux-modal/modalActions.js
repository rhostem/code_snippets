import { createActions } from 'redux-actions'
import { ModalPayload, modalType } from 'models/modalModel'
import { all, takeEvery, put } from 'redux-saga/effects'
import * as R from 'ramda'

export const types = {
  SHOW_ALERT: 'SHOW_ALERT',
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  UPDATE_MODAL_STATE: 'UPDATE_MODAL_STATE',
  CLOSE_MODAL: 'closeModal',
}

export const modalActions = createActions({
  // 알림
  [types.SHOW_ALERT]: (p: ModalPayload) =>
    R.merge(p, { type: modalType.ALERT }),

  // 확인
  [types.SHOW_CONFIRM]: (p: ModalPayload) =>
    R.merge(p, { type: modalType.CONFIRM }),

  // modal state 업데이트
  [types.UPDATE_MODAL_STATE]: (p: ModalPayload) => p,

  // 닫기
  [types.CLOSE_MODAL]: undefined,
})

function* modalProcess() {
  yield takeEvery(types.SHOW_ALERT, function*({ payload }) {
    yield put(modalActions.closeModal())
    yield put(modalActions.updateModalState(payload))
  })

  yield takeEvery(types.SHOW_CONFIRM, function*({ payload }) {
    yield put(modalActions.closeModal())
    yield put(modalActions.updateModalState(payload))
  })
}

export function* modalSaga(): Generator<any, any, any> {
  yield all([modalProcess()])
}
