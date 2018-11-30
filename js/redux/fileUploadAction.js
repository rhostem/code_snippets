// import { uploadFile } from '../../api/file'
import * as types from './types'
import { withRootURL } from '../../api/client'
import { LOCAL_STORAGE } from '../../constants'
import localStorage from '../../utils/localStorage'

export const fileUploadStart = () => {
  return {
    type: types.UPLOAD_FILE_START,
  }
}

export const fileUploadSuccess = () => {
  return {
    type: types.UPLOAD_FILE_SUCCESS,
  }
}

export const fileUploadFailure = message => {
  return {
    type: types.UPLOAD_FILE_FAILURE,
    message,
  }
}

export const setUploadProgress = progressPercentage => {
  return {
    type: types.SET_UPLOAD_PROGRESS,
    progressPercentage,
  }
}

let uploadXHR: XMLHttpRequest

/**
 * fetch API가 아닌 XHR을 사용한다.
 * 업로드 진행 상태에 따라 진행상태값을 업데이트한다.
 */
export const uploadFiles = ({
  files,
  uploadCount = 1,
  onComplete,
  onError,
}: {
  files: FileList | Array,
  uploadCount: number,
  onComplete: Function,
  onError: Function,
}) => {
  return (dispatch: Function) => {
    dispatch(fileUploadStart())

    const formData = new FormData()

    const uploadFileCount = !uploadCount
      ? files.length
      : uploadCount < files.length
      ? uploadCount
      : files.length

    for (let i = 0; i < uploadFileCount; i++) {
      formData.append('file', files[i], files[i].name) // set이 아닌 append를 사용
    }

    uploadXHR = new XMLHttpRequest()

    uploadXHR.onloadstart = function(e) {
      console.log('upload started')
    }

    uploadXHR.onloadend = function(e) {
      if (e.target.status === 200) {
        // if done
        const res = JSON.parse(e.target.response)

        dispatch(fileUploadSuccess())

        if (typeof onComplete === 'function') {
          onComplete(res)
        }
      }
    }

    uploadXHR.onerror = function(e) {
      dispatch(fileUploadFailure(e))
      console.error(e)
      if (typeof onError === 'function') {
        onError(e)
      }
    }

    // $FlowFixMe
    uploadXHR.upload.addEventListener('progress', function(event) {
      const { loaded, total } = event
      const laodedPercent = Number(
        parseFloat((loaded / total) * 100).toFixed(2)
      )
      dispatch(setUploadProgress(laodedPercent))
    })

    uploadXHR.open('POST', withRootURL('/admin/v1/file/'))
    uploadXHR.setRequestHeader(
      'x-auth-token',
      `${localStorage.get(LOCAL_STORAGE.authToken)}`
    )
    uploadXHR.send(formData)
  }
}

export const cancelUploadFile = () => {
  return dispatch => {
    uploadXHR.abort() // abort xhr
    dispatch(fileUploadFailure('파일 업로드가 취소되었습니다.'))
  }
}
