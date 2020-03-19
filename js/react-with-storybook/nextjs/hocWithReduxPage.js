import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLoggedIn } from 'features/navbar/navbarSlice'

export const mapStateToProps = (state: IRootState) => ({})

export const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default function withAutoLogin(WrappedComponent) {
  class wrappedComponent extends Component {
    static async getInitialProps(ctx) {
      let wrappedComponentProps = {}

      // getInitialProps 메소드를 hoc에서 실행해서 덮어쓴다
      if (WrappedComponent.getInitialProps) {
        wrappedComponentProps = await WrappedComponent.getInitialProps(ctx)
      }

      return {
        ...wrappedComponentProps,
      }
    }

    render() {
      console.log(`this.props`, this.props)

      const passedProps = Object.assign({}, this.props, {})

      return <WrappedComponent {...passedProps} />
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent)
}
