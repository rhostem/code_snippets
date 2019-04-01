export const withBackendUrl = url => `${process.env.BACKEND_URL}${url}`

const makeHeader = () => {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  return headers
}

const defaultOptions = {
  mode: 'cors',
  cache: 'default',
}

// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
const handleError = res => {
  if (!res.ok) {
    // alert(`네트워크 오류가 발생했습니다 (${res.status} ${res.statusText})`)
    console.error(res)
    throw new Error(`${res.status}: ${res.statusText}`)
  } else {
    return res
  }
}

function queryParams<P extends {}>(params: P) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

export default {
  get: (url: string, params?, options?) =>
    fetch(
      withBackendUrl(`${url}?${queryParams(params)}`),
      Object.assign({}, defaultOptions, {
        method: 'GET',
        headers: makeHeader(),
        ...options,
      })
    ).catch(handleError),

  post: (url, body, options?): Promise<{ url: string; body: any }> =>
    fetch(
      withBackendUrl(url),
      Object.assign({}, defaultOptions, {
        method: 'POST',
        headers: makeHeader(),
        body,
        ...options,
      })
    ).catch(handleError),

  put: (url, body, options?): Promise<{ url: string; body: any }> =>
    fetch(
      withBackendUrl(url),
      Object.assign({}, defaultOptions, {
        method: 'PUT',
        headers: makeHeader(),
        body,
        ...options,
      })
    ).catch(handleError),

  delete: (url: string, options?) =>
    fetch(
      withBackendUrl(url),
      Object.assign({}, defaultOptions, {
        headers: makeHeader(),
        method: 'DELETE',
        ...options,
      })
    ).catch(handleError),
}

// import axios from 'axios'
// /**
//  * custom axios client
//  */
// export default axios.create({
//   baseURL: process.env.REACT_APP_API_ROOT,
//   headers: {
//     'x-auth-token': token,
//   },
// })
