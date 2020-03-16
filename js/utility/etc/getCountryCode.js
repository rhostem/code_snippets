const axios = require('axios')

function debouncePromise(inner, ms = 0) {
  let timer = null
  let resolves = []

  return function(...args) {
    // Run the function after a certain amount of time
    clearTimeout(timer)
    timer = setTimeout(() => {
      // Get the result of the inner function, then apply it to the resolve function of
      // each promise that has been created since the last time the inner function was run
      let result = inner(...args)
      resolves.forEach(r => r(result))
      resolves = []
    }, ms)

    return new Promise(r => resolves.push(r))
  }
}

/**
 * id-api 서비스를 사용해서 브라우저 정보를 가져온다. 결과는 아래 형태와 같다
 * 국가 코드 뿐만 아니라 아이피 주소(결과의 query 필드), 위치, 타임존 까지 알 수 있다.
  {
    as: 'AS4766 Korea Telecom',
    city: 'Suwon',
    country: 'South Korea',
    countryCode: 'KR',
    isp: 'Korea Telecom',
    lat: 37.2859,
    lon: 127.0099,
    org: '',
    query: '121.134.184.173',
    region: '41',
    regionName: 'Gyeonggi-do',
    status: 'success',
    timezone: 'Asia/Seoul',
    zip: '',
  }
 */
module.exports = debouncePromise(() => {
  return axios
    .request({
      url: 'http://ip-api.com/json',
      method: 'get',
      timeout: 1000,
    })
    .then(res => {
      const { data } = res
      const countryCode = data.countryCode
      return countryCode
    })
    .catch(e => {
      console.error(e)
      return null
    })
}, 200)
