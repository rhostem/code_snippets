import React from 'react';
import { Provider } from 'react-redux';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router';
import { RecoilRoot } from 'recoil';

/**
 * API full 엔드포인트 가져오기
 * msw 핸들러에서 사용한다.
 */
export const getHandlerEndpoint = (uri: string) => {
  return `${import.meta.env.SNOWPACK_PUBLIC_API_HOST}${uri}`;
};

export const TestMemoryRouter: React.FC<{
  initialEntries?: string[];
}> = ({ initialEntries = ['/'], children }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

export const TestRecoilRoot: React.FC = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const queryCache = new QueryCache(); // react-query cache
const queryClient = new QueryClient({
  queryCache,
});

export const TestQueryClientProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const createTestStore = (initialState?: RootState) => {
  const middlewares = [];

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};

/**
 * 테스트용 Redux provider
 */
export const TestReduxProvider = ({
  initialState,
  children,
}: {
  initialState?: RootState;
  children: React.ReactNode;
}) => {
  const storeWithInit = React.useMemo(() => {
    return createTestStore(initialState);
  }, [initialState]);

  return <Provider store={storeWithInit}>{children}</Provider>;
};
