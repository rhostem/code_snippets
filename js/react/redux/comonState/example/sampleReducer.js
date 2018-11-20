import * as R from 'ramda'
import { types } from './sampleActions'
import { handleActions } from 'redux-actions'
import {
  LIST_STATE,
  ListState,
  emptyListWithError,
  startLoadingList,
  updateList,
} from 'store/commonState/list'

type State = {
  list: ListState<T>,
}

const STATE: State = {
  list: R.clone(LIST_STATE),
}

const reducer = handleActions(
  {
    [types.REQ_LIST_SAMPLE]: startLoadingList,
    [types.REQ_LIST_SAMPLE_DONE]: updateList,
    [types.REQ_LIST_SAMPLE_FAIL]: emptyListWithError,
  },
  STATE
)

export default reducer
