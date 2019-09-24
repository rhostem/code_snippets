import _ from 'lodash';

/**
 * validator 조합
 * 파리미터로 전달된 함수를 실행하면서 발견한 첫번째 오류 메시지를 최종 값으로 전달한다.
 *
 * @param  {...any} validators
 */
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = v => (_.isNil(v) ? '이 값은 필수입니다.' : undefined);

export const notEmptyString = v =>
  typeof v === 'string' && v.length === 0 ? '빈 문자열입니다.' : undefined;

export const mustBeNumber = v =>
  typeof v !== 'number' ? '이 값은 숫자여야 합니다' : undefined;

export const mustBeBoolean = v =>
  typeof v !== 'boolean' ? '이 값은 예/아니오 중 하나여야 합니다.' : undefined;

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `${min}보다 큰 값이어야 합니다.`;

export const maxValue = max => value =>
  isNaN(value) || value <= max ? undefined : `${max}보다 작은 값이어야 합니다.`;

export const notEmtpryArray = v =>
  Array.isArray(v) && v.length > 0
    ? undefined
    : '1개 이상의 항목을 포함해야 합니다.';
