/**
 * https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 *
 * @param {*} b64DataURI "data:image/jpeg;base64,/9j/4A..."
 * @param {*} contentType mimetype
 * @param {*} sliceSize
 */
const base64toBlob = (
  b64DataURI,
  contentType = 'text/html',
  sliceSize = 512
) => {
  const [, b64Data] = b64DataURI.split(',')
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export default base64toBlob
