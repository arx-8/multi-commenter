import { replace } from "connected-react-router"
import { TWITTER_CALLBACK_URL } from "src/constants/Env"
import { RoutePath } from "src/constants/RoutePaths"
import {
  createAccessTokens,
  createOAuthTokens,
} from "src/data/apis/MultiCommenterAPIClient"
import { toSerializableError } from "src/domain/errors/SerializableError"
import { TwitterOauthVerifier } from "src/domain/models/Twitter"
import { AppThunkAction } from "src/types/ReduxTypes"
import * as actions from "./actions"

export const twitterSignIn = (): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.twitterSignIn.started())

    let resp
    try {
      resp = await createOAuthTokens({
        callback_url: TWITTER_CALLBACK_URL,
      })
    } catch (error) {
      console.log(error)

      dispatch(
        actions.twitterSignIn.failed({
          error: toSerializableError(error),
        })
      )
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

    let resp
    try {
      resp = await createAccessTokens({
        callback_url: TWITTER_CALLBACK_URL,
        oauth_token_key: authState.twitter.oauthTokens.oauth_token_key,
        oauth_token_secret: authState.twitter.oauthTokens.oauth_token_secret,
        oauth_verifier: oauthTokenVerifier,
      })
    } catch (error) {
      console.log(error)

      dispatch(
        actions.twitterSignInFinalize.failed({
          error: toSerializableError(error),
        })
      )
      return
    }

    dispatch(
      actions.twitterSignInFinalize.done({
        result: resp,
      })
    )

    // クエリパラメータを取り込み終わったら、クエリパラメータを消すため遷移
    // 「戻る」ができると再度ここの処理が無駄に走るため、履歴は残さない
    dispatch(replace(RoutePath.Settings))
  }
}
