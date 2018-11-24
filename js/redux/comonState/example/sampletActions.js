import { createActions } from 'redux-actions'
import { ReadListActionOption, ListCallData } from 'store/commonState/list'
import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import SampleAPI from 'api/SampleAPI'
import * as R from 'ramda'
import { dotPath } from 'utils/ramda'

export const makeAsyncType = (name = ''): { [string]: string } => {
  return {
    [`REQ_${name}`]: `REQ_${name}`,
    [`REQ_${name}_DONE`]: `REQ_${name}_DONE`,
    [`REQ_${name}_FAIL`]: `REQ_${name}_FAIL`,
  }
}

export const types = {
  ...makeAsyncType('SAMPLE'),
}

export const sampleActions = createActions({
  [types.REQ_SAMPLE]: (option: ReadListActionOption) => option,
  [types.REQ_SAMPLE_DONE]: (d: ListCallData) => d,
  [types.REQ_SAMPLE_FAIL]: undefined,
})

function* listSample() {
  yield takeLatest(types.REQ_SAMPLE, function*({ payload }) {
    try {
      const option = R.merge(yield select(state => dotPath('sample.list.option', state)), payload)
      const data = yield call(SampleAPI.readList, option)

      yield put(sampleActions.reqListSampleDone(data))
    } catch (e) {
      console.error(e)
      yield put(sampleActions.reqListSampleFail(e))
    }
  })
}

export function* sampleSaga() {
  yield all([listSample()])
}
