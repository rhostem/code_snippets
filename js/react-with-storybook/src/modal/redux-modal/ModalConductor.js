import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { compose } from 'ramda'
import { modalActions } from 'store/modal/modalActions'
import { State as ModalState } from 'store/modal/modalReducer'
import { modalType } from 'models/modalModel'
import Alert from 'components/modal/Alert'

class ModalConductor extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCloseWithCb(cb: Function) {
    return () => {
      this.props.closeModal()
      typeof cb === 'function' && cb()
    }
  }

  /**
   * 확인, 취소를 누르지 않고 ESC키 입력이나 overlay 영역 클릭으로 닫을 때
   */
  handleJustClose = () => {
    this.props.closeModal()
  }

  render() {
    const {
      isOpen,
      type,
      content,
      i18nKey,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      isButtonVisible,
    } = this.props

    switch (type) {
      case modalType.ALERT:
        return (
          <Alert
            isOpen={isOpen}
            isConfirm={false}
            content={content}
            i18nKey={i18nKey}
            onJustClose={this.handleJustClose}
            onConfirm={this.handleCloseWithCb(onConfirm)}
            onCancel={this.handleCloseWithCb(onCancel)}
            confirmText={confirmText}
            isButtonVisible={isButtonVisible}
          />
        )
      case modalType.CONFIRM:
        return (
          <Alert
            isOpen={isOpen}
            isConfirm={true}
            content={content}
            i18nKey={i18nKey}
            onJustClose={this.handleJustClose}
            onConfirm={this.handleCloseWithCb(onConfirm)}
            onCancel={this.handleCloseWithCb(onCancel)}
            confirmText={confirmText}
            cancelText={cancelText}
            isButtonVisible={isButtonVisible}
          />
        )
      default:
        return null
    }
  }
}

const mapStateToProps = ({ modal }: { modal: ModalState }) => ({
  ...modal,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      closeModal: modalActions.closeModal,
    },
    dispatch
  )
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ModalConductor)
