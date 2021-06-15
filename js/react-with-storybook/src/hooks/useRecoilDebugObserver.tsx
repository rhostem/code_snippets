import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';
import * as Sentry from '@sentry/react';
import { isSentryEnabled } from 'vendor/sentry';

function useRecoilDebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    if (import.meta.env.NODE_ENV === 'development') {
      console.group(`The following atoms were modified:`);
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        console.debug(node.key, snapshot.getLoadable(node).contents);
      }
      console.groupEnd();
    }
  }, [snapshot]);

  useEffect(() => {
    if (isSentryEnabled) {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        Sentry.addBreadcrumb({
          category: 'Recoil atom',
          data: {
            key: node.key,
            contents: snapshot.getLoadable(node).contents,
          },
          level: Sentry.Severity.Log,
        });
      }
    }
  }, [snapshot]);
}

export default useRecoilDebugObserver;
