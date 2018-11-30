import * as R from 'ramda'

export const isImageFile = (
  imageFile: File,
  regex = /^image\/(png|jpg|jpeg|gif)$/i
) => {
  return (
    imageFile &&
    R.allPass([
      file => file.constructor.name === 'File',
      file => regex.test(file.type),
    ])(imageFile)
  )
}
