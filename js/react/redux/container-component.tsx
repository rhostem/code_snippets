import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { RootState } from '../../store/rootReducer';

interface Props {}
type State = {};

class TSContainer extends React.Component<Props, State> {
  static defaultProps = {};

  state: State = {};

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <div>TSContainer</div>;
  }
}

const mapStateToProps = (state: RootState, ownProps: {}) => ({
  // name: state.reducer.prop,
});

const mapDispatchToProps = (dispatch: Dispatch<{}>) =>
  bindActionCreators(
    {
      // actionName,
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TSContainer);