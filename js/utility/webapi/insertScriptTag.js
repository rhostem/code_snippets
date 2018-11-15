export const insertScriptTag = ({
  document,
  id = '',
  source = '',
  onload = () => {},
}) => {
  var js,
    fjs = document.getElementsByTagName('script')[0]

  if (document.getElementById(id)) {
    return
  }
  js = document.createElement('script')
  js.id = id
  js.src = source
  js.onload = onload
  fjs.parentNode.insertBefore(js, fjs)
}
