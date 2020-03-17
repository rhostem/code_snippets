/**
 * 객체를 multipart/formdata 컨텐츠 타입으로 변환한다
 * @param {*} obj
 */
const makeFormData = obj => {
  const form = new FormData()

  for (const prop in obj) {
    console.log(`obj[prop]`, obj[prop])

    form.append(prop, obj[prop])
  }

  return form
}

export default makeFormData
