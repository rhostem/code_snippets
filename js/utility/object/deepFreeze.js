export const deepFreeze = obj =>
  Object.keys(obj).forEach(
    prop =>
      // primitive 값이거나 freeze된 상태라면 아무것도 하지 않음.
      !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop])
        ? null
        : deepFreeze(obj[prop]) // 객체 필드의 값으로 재퀴호출
  ) || Object.freeze(obj) // 파라미터 객체를 freeze. forEach가 undefined 리턴하므로 무조건 실행됨
