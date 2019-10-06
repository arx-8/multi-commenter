import { TWITTER_CALLBACK_URL } from "src/constants/Env"
import { createOAuthTokens } from "src/data/apis/MultiCommenterAPIClient"
import { toSerializableError } from "src/domain/errors/SerializableError"
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
