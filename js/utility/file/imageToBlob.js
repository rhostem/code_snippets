import isImageFile from './isImageFile'
export default function imageToBlob(file) {
  if (isImageFile(file)) {
    return URL.createObjectURL(file)
  } else {
    console.error('target is not a file')
  }
}
