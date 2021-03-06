import { replace } from "connected-react-router"
import { batch } from "react-redux"
import { APP_NAME_LONG } from "src/constants/App"
import {
  GOOGLE_API_API_KEY,
  GOOGLE_API_CLIENT_ID,
  TWITTER_CALLBACK_URL,
} from "src/constants/Env"
import {
  GOOGLE_API_DISCOVERY_DOCS,
  GOOGLE_API_SCOPES,
} from "src/constants/GoogleAPI"
import { RoutePath } from "src/constants/RoutePaths"
import {
  createAccessTokens,
  createOAuthTokens,
} from "src/data/apis/MultiCommenterAPIClient"
import { CreateAccessTokensResponse } from "src/data/apis/MultiCommenterAPIClient/types"
import {
  toSerializableError,
  toSerializableErrorByKyError,
} from "src/domain/errors/SerializableError"
import { TwitterOauthVerifier } from "src/domain/models/Twitter"
import { authSelectors } from "src/store/auth"
import { logOperations } from "src/store/log"
import { AppThunkAction } from "src/types/ReduxTypes"
import { FixMeAny } from "src/types/Utils"
import * as actions from "./actions"

export const initAndCheck = (): AppThunkAction => {
  return async (dispatch, getState) => {
    dispatch(
      logOperations.addLog({
        action: "初期化中",
        detail: "",
        noticeStatus: "ok",
      })
    )

    await initGoogleAuthClient()

    // gapi インスタンスから読み取らないと、本当にログインできているかわからない(localstorageのキャッシュを信用しすぎない)ため
    if (googleAuth) {
      actions.googleSetIsAuthorized(googleAuth.isSignedIn.get())
    } else {
      actions.googleSetIsAuthorized(false)
    }

    const rootState = getState()
    if (authSelectors.isAuthorizedTwitter(rootState)) {
      dispatch(
        logOperations.addLog({
          action: "初期化完了",
          detail: "Twitter 認証済み",
          noticeStatus: "ok",
        })
      )
    } else {
      dispatch(
        logOperations.addLog({
          action: "初期化完了(未認証)",
          detail: "Twitter 未認証",
          noticeStatus: "warn",
        })
      )
    }

    if (rootState.auth.google.isAuthorized) {
      // メインアカウントとブランドアカウント、どっちで連携認証したかわかりづらいため
      // (例えば、「ブランドアカウント」で LIKE 、「メインアカウント」で見たら反映されてない・・・とかがある)
      // TODO 使用アイコンなり出さないと、Twitterもわからん
      if (!googleAuth) {
        throw new Error("Initialize before call operations")
      }
      const name = googleAuth.currentUser
        .get()
        .getBasicProfile()
        .getName()

      dispatch(
        logOperations.addLog({
          action: "初期化完了",
          detail: `YouTube 認証済み (Name: ${name})`,
          noticeStatus: "ok",
        })
      )
    } else {
      dispatch(
        logOperations.addLog({
          action: "初期化完了(未認証)",
          detail: "YouTube 未認証",
          noticeStatus: "warn",
        })
      )
    }
  }
}

/**
 * Twitter
 */
export const twitterSignIn = (): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.twitterSignIn.started())

    let resp
    try {
      resp = await createOAuthTokens({
        callback_url: TWITTER_CALLBACK_URL,
      })
    } catch (error) {
      console.warn(error)
      const e = toSerializableErrorByKyError(error, await error.response.text())

      dispatch(
        logOperations.addLog({
          action: "Twitter 認証失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.twitterSignIn.failed({ error: e }))
      return
    }

    const { authenticate_url, oauth_token_key, oauth_token_secret } = resp

    dispatch(
      actions.twitterSignIn.done({
        result: {
          oauth_token_key,
          oauth_token_secret,
        },
      })
    )

    // 認証へ
    window.location.href = authenticate_url
  }
}

/**
 * 認証コールバックを受け取って最終処理
 * コールバック遷移する都合、メモリ上の Redux state は揮発しているため、local storage から読み取っている
 */
export const twitterSignInFinalize = (
  oauthTokenVerifier: TwitterOauthVerifier
): AppThunkAction => {
  return async (dispatch, getState) => {
    dispatch(actions.twitterSignInFinalize.started())

    const authState = getState().auth
    if (!authState.twitter.oauthTokens) {
      throw new Error(
        "Logic failure: authState.twitter.oauthTokens is undefined "
      )
    }

    let resp: CreateAccessTokensResponse
    try {
      resp = await createAccessTokens({
        callback_url: TWITTER_CALLBACK_URL,
        oauth_token_key: authState.twitter.oauthTokens.oauth_token_key,
        oauth_token_secret: authState.twitter.oauthTokens.oauth_token_secret,
        oauth_verifier: oauthTokenVerifier,
      })
    } catch (error) {
      console.warn(error)
      const e = toSerializableErrorByKyError(error, await error.response.text())

      dispatch(
        logOperations.addLog({
          action: "Twitter 認証失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.twitterSignInFinalize.failed({ error: e }))
      return
    }

    batch(() => {
      dispatch(
        actions.twitterSignInFinalize.done({
          result: resp,
        })
      )

      // クエリパラメータを取り込み終わったら、クエリパラメータを消すため遷移
      // 「戻る」ができると再度ここの処理が無駄に走るため、履歴は残さない
      dispatch(replace(RoutePath.Settings))

      dispatch(
        logOperations.addLog({
          action: "Twitter 認証完了",
          detail: "",
          noticeStatus: "ok",
        })
      )
    })
  }
}

const twitterSignOut = (): AppThunkAction<void> => {
  return (dispatch) => {
    batch(() => {
      dispatch(actions.twitterSignOut())

      dispatch(
        logOperations.addLog({
          action: "Twitter 認証情報削除完了",
          detail: "",
          noticeStatus: "ok",
        })
      )
    })
  }
}

/**
 * Google
 */
/**
 * このインスタンスがステートフルなので、グローバル変数扱いする
 * 認証状態は、Redux state に転写することで変更検知可能にしている
 */
let googleAuth: gapi.auth2.GoogleAuth | undefined

const initGoogleAuthClient = (): Promise<void> => {
  // gapi.load が callback hell なので、Promise 化
  return new Promise((resolve) => {
    const loadCb = async (): Promise<void> => {
      await gapi.client.init({
        apiKey: GOOGLE_API_API_KEY,
        discoveryDocs: GOOGLE_API_DISCOVERY_DOCS,
        clientId: GOOGLE_API_CLIENT_ID,
        scope: GOOGLE_API_SCOPES,
      })

      googleAuth = gapi.auth2.getAuthInstance()
      resolve()
    }

    gapi.load("client:auth2", loadCb as FixMeAny)
  })
}

export const googleSignIn = (): AppThunkAction => {
  return async (dispatch) => {
    if (!googleAuth) {
      throw new Error("Initialize before call operations")
    }

    dispatch(actions.googleSignIn.started())

    try {
      await googleAuth.signIn()
    } catch (error) {
      console.warn(error)
      const e = toSerializableError(error)

      dispatch(
        logOperations.addLog({
          action: "YouTube 認証失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.googleSignIn.failed({ error: e }))
      return
    }

    batch(() => {
      if (!googleAuth) {
        throw new Error("Initialize before call operations")
      }

      dispatch(
        actions.googleSignIn.done({
          result: googleAuth.currentUser
            .get()
            .hasGrantedScopes(GOOGLE_API_SCOPES),
        })
      )

      dispatch(
        logOperations.addLog({
          action: "YouTube 認証完了",
          detail: "",
          noticeStatus: "ok",
        })
      )
    })
  }
}

const googleSignOut = (): AppThunkAction<void> => {
  return (dispatch) => {
    if (!googleAuth) {
      // 認証前にサインアウトボタンが押される可能性もあるため
      return
    }
    googleAuth.signOut()

    batch(() => {
      dispatch(actions.googleSignOut())

      dispatch(
        logOperations.addLog({
          action: "YouTube 認証情報削除完了",
          detail: "",
          noticeStatus: "ok",
        })
      )
    })
  }
}

export const signOutAll = (): AppThunkAction<void> => {
  return (dispatch) => {
    batch(() => {
      dispatch(twitterSignOut())
      dispatch(googleSignOut())

      // redux-localstorage で書き込んだ内容も削除
      window.localStorage.removeItem(APP_NAME_LONG)
    })
  }
}
