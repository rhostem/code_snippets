import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'
import qs from 'qs'
import { devLog } from 'utils/log'
import storageKeys from 'constant/storageKeys'
import { getIsMobile } from 'utils/isMobile'
import canUseDOM from 'utils/canUseDOM'

/**
 * 문서
 * https://developers.kakao.com/docs/js
 *
 * SDK
 * https://developers.kakao.com/sdk/js/kakao.min.js
 */
const kakaoService = {
  /**
   * 카카오 javascript SDK 로드
   */
  loadKakaoSDK() {
    if (canUseDOM()) {
      devLog('KAKAO_JAVASCRIPT_KEY', process.env.KAKAO_JAVASCRIPT_KEY)
      Kakao.init(process.env.KAKAO_JAVASCRIPT_KEY)
    }
  },

  kakaoLogin({ onSuccess, onFail, redirectAfterAuth }) {
    Kakao.Auth.login({
      throughTalk: getIsMobile(), // 간편 로그인 사용 여부. 모바일이면 사용한다.
      success: function(authObj = {}) {
        Cookies.set(storageKeys.KAKAO_ACCESS_TOKEN, authObj.access_token, {
          expires: 0.5,
        })
        Cookies.set(storageKeys.KAKAO_REFRESH_TOKEN, authObj.refresh_token, {
          expires: 30,
        })

        if (typeof onSuccess === 'function') {
          onSuccess()
        }

        if (redirectAfterAuth) {
          window.location.href = redirectAfterAuth
        }
      },
      fail: function(err) {
        const { error, error_description } = err
        let errorMsg = error_description || JSON.stringify(error)
        console.error(errorMsg) // print error object
        if (typeof onFail === 'function') {
          onFail({ errorMsg })
        }
      },
    })
  },

  /**
   * rest API 로그인.
   * https://developers.kakao.com/docs/restapi/user-management#로그인
   *
   * - refresh 토큰이 있는지 확인
   * - 있으면 access 토큰 재발급 시도
   * - 재발급 성공하면 타겟 페이지로 즉시 이동
   * - 재발급 실패하면 oauth 페이지로 이동해서 로그인 요청
   */
  async kakaoLoginWithRest(redirectAfterAuth = '') {
    const refresh_token = Cookies.get(storageKeys.KAKAO_REFRESH_TOKEN)

    if (!!refresh_token) {
      // 토큰 재발급 시도
      try {
        await this.refreshKakaoAccessToken()

        Router.push(redirectAfterAuth)
      } catch (e) {
        this.redirectToKakaoOAuthPage(redirectAfterAuth)
        console.error('카카오 토큰 재발급에 실패했습니다.', e)
      }
    } else {
      this.redirectToKakaoOAuthPage(redirectAfterAuth)
    }
  },

  /**
   * https://kauth.kakao.com/oauth/token 페이지로 이동해서 로그인 시도
   */
  redirectToKakaoOAuthPage(redirectAfterAuth = '') {
    const query = qs.stringify({
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: `${process.env.PUBLIC_URL}/auth/kakaologin`, // console에서 설정
      response_type: 'code',
    })

    window.location.href = `https://kauth.kakao.com/oauth/authorize?${query}`
  },

  /**
   * 사용자 토큰 갱신
   * access_token은 12~24시간 유효. refresh 토큰은 1달간 유효함.
   * 갱신 실패시 bad request 에러 발생
   */
  async refreshKakaoAccessToken() {
    return axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        qs.stringify({
          grant_type: 'refresh_token',
          client_id: process.env.KAKAO_REST_API_KEY,
          refresh_token: Cookies.get(storageKeys.KAKAO_REFRESH_TOKEN),
          client_secret: process.env.KAKAO_CLIENT_SECRET,
        })
      )
      .then(res => {
        const { access_token, refresh_token } = res.data
        Cookies.set(storageKeys.KAKAO_ACCESS_TOKEN, access_token, {
          expires: 0.5,
        })
        devLog('카카오 access token이 쿠키에 저장되었습니다.')

        // refresh_token은 항상 결과에 포함되지 않는다.
        if (!!refresh_token) {
          Cookies.set(storageKeys.KAKAO_REFRESH_TOKEN, refresh_token, {
            expires: 30,
          })
          devLog('카카오 refresh token이 쿠키에 저장되었습니다.')
        }
      })
  },

  /**
   * 카카오톡으로 이벤트 링크 보내기
   */
  sendLinkWithKakao: ({ title, description, imageUrl, url }) {
    if (!window.Kakao) {
      alert('카카오 SDK를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    // https://developers.kakao.com/docs/js-reference#kakao_link_senddefault
    // https://developers.kakao.com/docs/js/demos/link-v2-send-default-feed
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        imageWidth: 1200,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    })
  }


  /**
   * 플러스친구 추가
   */
  AddPlusFriend(plusfriendId) {
    Kakao.PlusFriend.addFriend({
      plusFriendId: plusfriendId,
    })
  },
}

export default kakao
