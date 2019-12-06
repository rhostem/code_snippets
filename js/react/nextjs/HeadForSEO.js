import React from 'react'
import Head from 'next/head'
import { isTruthy } from 'utils/ramda'

const SEO = {
  title: 'title',
  description: 'desc',
  keywords: 'a,b,c,d,e',
  author: 'author',
  mainImage: `${process.env.REACT_APP_CDN_URL}/images/mainImage.png`,
  fbAppId: process.env.FB_APP_ID,
  appName: 'app name',
  appstoreId: undefined, // 애플 앱
  androidPackageId: undefined, // 안드로이드 앱 패키지 아이디
  publicUrl: process.env.PUBLIC_URL,
}

const HeadForSEO = ({
  title = SEO.title,
  description = SEO.description,
  url = SEO.publicURL,
  image = SEO.mainImage,
  author = SEO.author,
  children,
} = {}) => {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="author" name="author" content={author} />
      {/* <meta name="naver-site-verification" content="" /> */}
      {/* 쿼리스트링에 따라 다른 페이지가 표시되므로 현재 페이지의 full URL을 넣어준다 */}
      <link key="canonical" rel="canonical" href={url} />
      {isTruthy(SEO.fbAppId) && (
        <meta property="fb:app_id" content={SEO.fbAppId} />
      )}
      {/* Facebook Meta Tags */}
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:image" property="og:image" content={image} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:site_name" property="og:site_name" content={SEO.appName} />
      <meta key="og:locale" property="og:locale" content="ko_KR" />
      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* <meta property="al:ios:url" content={iosApplink} />
      <meta property="al:ios:app_store_id" content={SEO.appstoreId} />
      <meta property="al:ios:app_name" content={SEO.appName} />
      <meta property="al:android:url" content={androidAppLink} />
      <meta property="al:android:app_name" content={SEO.appName} />
      <meta property="al:android:package" content={SEO.androidPackageId} />
      <meta property="al:web:url" content={SEO.quizBuzzHomeUrl} /> */}
      {children}
    </Head>
  )
}

export default HeadForSEO
