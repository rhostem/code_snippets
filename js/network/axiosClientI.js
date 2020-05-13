import * as R from 'ramda'
import axios from 'axios'
import { devLog } from 'utils/log'
import makeFormUrlEncoded from 'utils/makeFormUrlEncoded'
import makeFormData from 'utils/makeFormData'

export const DEFAULT_CONFIG = {
  baseURL: process.env.MEDICO_API,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
}

const instance = axios.create(DEFAULT_CONFIG)

export const contentTypes = {
  FORM_URLENCODED: 'application/x-www-form-urlencoded; charset=UTF-8',
  MULTIPART_FORMDATA: 'multipart/formdata; charset=utf-8',
}

export const API = {
  instance,

  get(url, config) {
    return this.instance.get(url, config)
  },

  post(url, data, contentType = contentTypes.FORM_URLENCODED, config) {
    return this.instance.post(
      url,
      this.makePostData(data, contentType),
      R.merge(config, {
        headers: {
          'Content-Type': contentType,
        },
      })
    )
  },

  put(url, data, contentType = contentTypes.FORM_URLENCODED, config) {
    return this.instance.put(
      url,
      this.makePostData(data, contentType),
      R.merge(config, {
        headers: {
          'Content-Type': contentType,
        },
      })
    )
  },

  delete(url, config) {
    return this.instance.delete(url, config)
  },

  createInstance(config = DEFAULT_CONFIG) {
    this.instance = axios.create(config)
    devLog(`axios instance created:`, process.env.MEDICO_API)
  },

  createInstanceWithAuth({ config = DEFAULT_CONFIG, key } = {}) {
    const merged = R.merge(config, {
      headers: {
        'X-API-KEY': key,
      },
    })
    this.instance = axios.create(merged)

    devLog(`axios instance created with Key`, key)
  },

  makePostData(data, contentType) {
    return contentType === contentTypes.FORM_URLENCODED
      ? makeFormUrlEncoded(data)
      : contentType === contentTypes.MULTIPART_FORMDATA
      ? makeFormData(data)
      : data
  },
}

export default API
