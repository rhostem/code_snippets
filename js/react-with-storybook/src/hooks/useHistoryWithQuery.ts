import { useCallback, useMemo } from 'react';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

export default function useHistoryWithQuery() {
  const history = useHistory();
  const location = useLocation();

  const createHistoryMethod = useCallback(
    (method: string) => {
      return ({
        query,
        pathname,
      }: {
        query: {
          [key: string]: any;
        };
        pathname?: string;
      }) => {
        const target = {
          pathname: pathname || location.pathname,
          search: qs.stringify(query),
        };
        if (method === 'push') {
          history.push(target);
        } else if (method === 'replace') {
          history.replace(target);
        }
      };
    },
    [history, location.pathname],
  );

  const historyWithQuery = useMemo(
    () => ({
      historyPushQuery: createHistoryMethod('push'),
      historyReplaceQuery: createHistoryMethod('replace'),
    }),
    [createHistoryMethod],
  );

  return historyWithQuery;
}
