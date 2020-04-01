export default function isfile(file) {
  return !!file && file.constructor.name === 'File'
}
