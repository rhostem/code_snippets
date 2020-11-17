import React, { useMemo } from 'react'
import { createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor } from 'store'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'store/reducer'
import { MemoryRouter } from 'react-router-dom'
import { RootAction, RootState } from 'store/types'
import rootEpic from 'store/epic'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { lightTheme } from 'style/theme'
import { Alert, Dialog } from 'component'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import produce from 'immer'

export const createTestStore = (initialState?: RootState) => {
  const epicMiddleware = createEpicMiddleware<
    RootAction,
    RootAction,
    RootState
  >()

  const middlewares = [epicMiddleware]

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  epicMiddleware.run(rootEpic)

  return store
}

export const TestProvider = ({
  initialState,
  initialEntries = ['/'],
  children,
}: {
  initialState?: RootState
  initialEntries?: string[]
  children: React.ReactNode
}) => {
  const storeWithInit = useMemo(() => {
    return createTestStore(initialState)
  }, [initialState])

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <MuiThemeProvider theme={lightTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Provider store={storeWithInit}>
            <PersistGate loading={<></>} persistor={persistor}>
              {children}
              <Alert />
              <Dialog />
            </PersistGate>
          </Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </MemoryRouter>
  )
}

/**
 * API 엔드포인트 가져오기
 * msw 핸들러에서 사용한다.
 */
export const getHandlerEndpoint = (uri: string) =>
  `${process.env.REACT_APP_API_HOST}/api/${uri}`

export const CI_SERVER_ASYNC_TIMEOUT = 100000
export const DEFAULT_ASYNC_TIMEOUT = 5000

/**
 * 로컬에서 성공하지만 서버에서는 실패하는 비동기 테스트가 있음.
 * 환경변수를 확인하여 CI 서버에서 충분한 타임아웃을 제공함.
 * @param delay
 */
export const giveEnoughTimeoutForServer = (delay = DEFAULT_ASYNC_TIMEOUT) =>
  process.env.CI ? CI_SERVER_ASYNC_TIMEOUT : delay

const rootInitialState = createTestStore().getState()

/**
 * TestProvider에서 initialState를 설정할 때 사용한다
 * @param cb produce 함수의 콜백
 */
export const produceInitialState = <T extends typeof rootInitialState>(
  cb: (draft: T) => void
) => {
  return produce(rootInitialState, cb)
}

export const isTestEnv = () => process.env.REACT_APP_ENVIRONMENT === 'Test'
