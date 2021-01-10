import { Dispatch } from 'react';
import { RootAction } from 'store/types';
import { isFetchingActions } from './slice';

// sample: FETCH_SIGN_IN#REQUEST, fetchReportListRequest
export const asyncTypeRegex = /^([^#]+)#?(Request|Success|Failure)$/i;
const requestTypeRegex = /^.+(Request)$/i;
const successTypeRegex = /^.+(Success)$/i;
const failureTypeRegex = /^.+(Failure)$/i;

const isFetchingMiddleware = () => (next: Dispatch<any>) => (
  action: RootAction
) => {
  if (asyncTypeRegex.test(action.type)) {
    const isRequest = requestTypeRegex.test(action.type);
    const isSuccess = successTypeRegex.test(action.type);
    const isFailure = failureTypeRegex.test(action.type);

    const parsed = asyncTypeRegex.exec(action.type);
    const asyncTypeName = parsed ? parsed[1] : '';

    if (isRequest) {
      // set action is fetching in progress
      next(
        isFetchingActions.setIsFetching({
          type: asyncTypeName,
          isFetching: true,
        })
      );
    } else if (isSuccess || isFailure) {
      // set action is not fetching
      next(
        isFetchingActions.setIsFetching({
          type: asyncTypeName,
          isFetching: false,
        })
      );
    }
  }

  next(action);
};

export default isFetchingMiddleware;
