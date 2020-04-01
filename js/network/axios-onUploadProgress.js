upload(files) {
  const config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  }

  let data = new FormData()
  data.append('file', files[0])

  axios.put('/endpoint/url', data, config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}