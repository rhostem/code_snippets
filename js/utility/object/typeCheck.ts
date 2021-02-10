/* eslint-disable @typescript-eslint/ban-types */
export const isNumber = (v: any): v is number => typeof v === 'number'
export const isString = (v: any): v is string => typeof v === 'string'
export const isBoolean = (v: any): v is boolean => typeof v === 'boolean'
export const isFunction = (v: any): v is Function => typeof v === 'function'
export const isArray = <T>(v: any): v is T[] => v.constructor === Array
export const isObject = <T extends { [key: string]: boolean }>(
  v: any
): v is T => v.constructor === Object
