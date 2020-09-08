import * as R from 'ramda'
import { types } from './modalActions'
import { handleActions } from 'redux-actions'
import { ModalPayload, modalType } from 'models/modalModel'

export type State = {
  isModalOpen: boolean,
} & ModalPayload

const STATE: State = {
  isOpen: false,
  type: null,
  content: null,
  i18nKey: null,
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: null,
  cancelText: null,
}

const closeModal = state => {
  return R.clone(STATE)
}

const openModal = (state, { payload }: { payload: ModalPayload }) => {
  const { type = modalType.ALERT, ...rest } = payload // 타입은 기본으로 ALERT

  return R.merge(state, { isOpen: true, type, ...rest })
}

const reducer = handleActions(
  {
    // [types.SHOW_ALERT]: openModal,
    // [types.SHOW_CONFIRM]: openModal,
    [types.UPDATE_MODAL_STATE]: openModal,
    [types.CLOSE_MODAL]: closeModal,
  },
  STATE
)

export default reducer
