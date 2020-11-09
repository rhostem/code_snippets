const isEmptyObj = (obj: any) => {
  return !!obj && typeof obj === 'object' && Object.keys(obj).length === 0
}

export default isEmptyObj
