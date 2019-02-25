import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { I18n } from 'react-i18next'
import { mixin } from 'styles'

const MODAL_BODY_WIDTH = '500px'

const ModalBody = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: ${MODAL_BODY_WIDTH};
  flex-direction: column;
  padding: 60px 55px;
  border: none;
  background-color: #fff;
`

export const AlertWrap = styled.div`
  ${mixin.centeredFixed()};
  width: 540px;
  background-color: #424242;
  z-index: 2000;
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22);
`

export const AlertBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 0;
  /* margin-bottom: 85px; */
  /* min-height: 194px; */
`

export const Buttons = styled.div`
  width: 100%;
  text-align: center;
  bottom: 48px;
  margin-top: 38px;
`

export const Button = styled.button`
  display: inline-block;
  width: 190px;
  color: #ffffff;
  background-color: #1f5de6;
  padding: 15px;
  border: none;
  font-size: 14px;

  &:nth-child(2n) {
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
  }
`

const AlertBtns = ({ onConfirm }) => (
  <I18n ns={['admin']}>
    {t => (
      <Buttons>
        <Button onClick={onConfirm}>{t('confirm')}</Button>
      </Buttons>
    )}
  </I18n>
)

const ConfirmBtns = ({ onCancel, onConfirm }) => (
  <I18n ns={['admin']}>
    {t => (
      <Buttons>
        <Button onClick={onCancel}>{t('cancel')}</Button>
        <Button
          onClick={onConfirm}
          style={{ backgroundColor: '#2b2b2b', color: '#fff' }}>
          {t('confirm')}
        </Button>
      </Buttons>
    )}
  </I18n>
)

type Props = {
  isOpen: boolean,
  isConfirm: boolean, // alert인지 confirm인지
  i18nKey: string, // I18n 번역 키
  onConfirm: Function, // 확인 버튼 콜
  onCancel: Function, // 취소 버튼 콜
  onJustClose: Function, // 확인, 취소 누르지 않고 닫기
  contentStyle?: Object,
  content: string, // modal body에 들어갈 내용. HTML 시용 가능
  children: React.component, // children이 있으면 content 무시
}
class Alert extends React.Component<Props, State> {
  static defaultProps = {
    onConfirm: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  /**
   * i18nkey가 전달되었으면 번역하고, 아니면 content를 그대로 사용한다.
   *
   * @param {*} t translate function
   * @returns
   * @memberof Alert
   */
  getContent(t) {
    const { i18nKey, content } = this.props
    return i18nKey ? t(i18nKey) : content
  }

  render() {
    const {
      isOpen,
      onConfirm,
      onCancel,
      onJustClose,
      contentStyle,
    } = this.props

    return (
      <I18n ns={['admin']}>
        {t => (
          <ReactModal
            isOpen={isOpen}
            contentLabel="AnswerModal"
            onRequestClose={onJustClose}
            style={{
              overlay: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 10000,
              },
              content: {
                top: '50%',
                left: '50%',
                bottom: 'initial',
                right: 'initial',
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                padding: 0,
                overflow: 'hidden',
                border: 'solid 3px #394e7e',
                ...contentStyle,
              },
            }}
            closeTimeoutMS={400}>
            <ModalBody>
              {this.props.children ? (
                <AlertBody>{this.props.children}</AlertBody>
              ) : (
                <AlertBody
                  dangerouslySetInnerHTML={{ __html: this.getContent(t) }}
                />
              )}

              {!this.props.isConfirm ? (
                <AlertBtns onConfirm={onConfirm} />
              ) : (
                <ConfirmBtns onConfirm={onConfirm} onCancel={onCancel} />
              )}
            </ModalBody>
          </ReactModal>
        )}
      </I18n>
    )
  }
}

export default Alert
