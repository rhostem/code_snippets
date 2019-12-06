/**
 * 라우트 정의
 *
 * pagePath: /page 폴더 안에 있는 컴포넌트 경로. Link 컴포넌트의 href 속성.
 * asPath(=as): 브라우저 url에 표시되는 경로. Link 컴포넌트의 as 속성. 없으면 pagePath가 된다.
 */
module.exports = [
  {
    pagePath: '/product/ProductDetail',
    asPath: '/product/:id',
    name: '마이페이지',
  },
]
