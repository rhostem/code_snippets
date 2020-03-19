export const modalType = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
}

export type ModalType = $Keys<typeof modalType>

export type ModalPayload = {
  type: ModalType,
  content?: string | React.Component,
  i18nKey?: string, // i18n의 t 메소드에서 사용할 키. null이 아니면 content에 우선해서 사용한다.
  onConfirm?: () => void, // alert, confirm의 확인 버튼 콜백
  onCancel?: () => void, // confirm의 cancel 버튼 콜백
  confirmText: string,
  cancelText: string,
}
