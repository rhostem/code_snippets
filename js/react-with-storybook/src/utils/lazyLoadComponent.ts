import React from 'react';

/**
 * 컴포넌트 import를 시도하며 일정 횟수 이상 실패하면 에러 페이지로 보낸다.
 * @param lazyComponent () => import('./View.tsx)
 * @param attemptsLeft 재시도 횟수
 * @returns
 */
const tryLoadComponent: (
  importComponent: () => Promise<any>,
  attemptsLeft?: number
) => () => Promise<{ default: React.ComponentType<any> }> = (
  lazyComponent,
  attemptsLeft = 3
) => () =>
  new Promise<{ default: React.ComponentType<any> }>(resolve => {
    lazyComponent()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          if (attemptsLeft === 1) {
            window.location.href = '/500';
            return;
          }
          tryLoadComponent(lazyComponent, attemptsLeft - 1)().then(resolve);
        }, 1500);
      });
  });

const lazyLoadComponent = (
  factory: () => Promise<{
    default: React.ComponentType<any>;
  }>
) => React.lazy(tryLoadComponent(factory, 3));

export default lazyLoadComponent;
