/**
 * 객체에서 keys 배열에 있는 키만 남겨두고 제거한다.
 *
 * @param {*} obj 수정할 객체
 * @param {*} keys 남겨둘 키 배열
 */
export const maintainKeys = (obj, keys = []) => {
  return Object.keys(obj)
    .filter(k => keys.includes(k))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key];
      return resultObj;
    }, {});
};

export const maintainKeysWith = (obj, predicate = () => true) => {
  return Object.keys(obj)
    .filter(k => predicate(obj[k]))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key];
      return resultObj;
    }, {});
};

/**
 * maintainKeys와 정반대 기능
 * @param {*} obj
 * @param {*} keys
 */
export const omitKeys = (obj, keys = []) => {
  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((resultObj, key) => {
      resultObj[key] = obj[key];
      return resultObj;
    }, {});
};

/**
 * 객체가 동일한 키를 가지고 있는지 확인한다.
 * 중첩된 객체도 확인한다.
 *
 * @returns boolean
 */
export function compareKeys(...objects) {
  if (objects.length < 2) {
    throw new Error(`at least to objects are required`);
  }

  for (const obj of objects) {
    if (typeof obj !== "object") {
      throw new Error(`parameter should be an object: ${obj}`);
    }
  }

  const keys = objects.map(obj => getAllNestedKeys(obj));
  const criteria = keys[0];

  return keys.every(key => key === criteria);
}

const getAllNestedKeys = (obj = {}) => {
  if (typeof obj !== "object") {
    throw new Error("parameter should be an object");
  }

  let keysConcat = "";
  const keys = Object.keys(obj).sort();

  keysConcat += keys.join(""); // add parent object keys

  for (const key of keys) {
    if (typeof obj[key] === "object") {
      keysConcat += getAllNestedKeys(obj[key]); // add child object keys
    }
  }

  return keysConcat;
};
