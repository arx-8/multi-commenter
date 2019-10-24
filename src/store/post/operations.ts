import { HTTPError } from "ky"
import { batch } from "react-redux"
import {
  postLiveChatMessage,
  postRateLike,
} from "src/data/apis/GoogleAPIClient"
import { postTweet } from "src/data/apis/MultiCommenterAPIClient"
import {
  toSerializableErrorByKyError,
  toSerializableErrorFromYouTubeAPIClientError,
} from "src/domain/errors/SerializableError"
import { extractVideoIdByURL } from "src/domain/models/Google"
import {
  TweetText,
  TwitterApiInvalidOrExpiredTokenError,
} from "src/domain/models/Twitter"
import { logOperations } from "src/store/log"
import { AppThunkAction } from "src/types/ReduxTypes"
import { FixMeAny } from "src/types/Utils"
import { concatAsTweet } from "src/utils/MessageUtils"
import * as actions from "./actions"

export const post = (main: string, suffix: string): AppThunkAction => {
  return async (dispatch) => {
    await Promise.all([
      dispatch(postTweetRequest(concatAsTweet(main, suffix))),
      dispatch(postYouTubeLiveChatRequest(main)),
    ])
  }
}

const postTweetRequest = (message: TweetText): AppThunkAction => {
  return async (dispatch, getState) => {
    const accessTokens = getState().auth.twitter.accessTokens
    if (!accessTokens) {
      throw new Error("Twitter auth required.")
    }

    dispatch(actions.postTweet.started())

    try {
      await postTweet({
        access_token_key: accessTokens.access_token_key,
        access_token_secret: accessTokens.access_token_secret,
        tweet: message,
      })
    } catch (_error) {
      const error: HTTPError = _error
      console.warn(error)
      const res:
        | TwitterApiInvalidOrExpiredTokenError
        | Record<string, FixMeAny> = await error.response.json()

      const e = toSerializableErrorByKyError(error, JSON.stringify(res))

      // レートリミットエラー？の場合に、非常に不親切なエラーメッセージが返るため
      if (
        Array.isArray(res) &&
        res.length === 1 &&
        res[0].message.includes("Invalid or expired token.")
      ) {
        dispatch(
          logOperations.addLog({
            action: "Twitter の投稿に失敗",
            detail:
              e.message +
              " Twitter APIの上限超過の可能性があります。1分程度後に再投稿して下さい。同じエラーが続く場合、認証情報を削除、再認証してください。",
            noticeStatus: "error",
          })
        )
      } else {
        dispatch(
          logOperations.addLog({
            action: "Twitter の投稿に失敗",
            detail: e.message,
            noticeStatus: "error",
          })
        )
      }

      dispatch(actions.postTweet.failed({ error: e }))
      return
    }

    batch(() => {
      dispatch(actions.postTweet.done({}))

      dispatch(
        logOperations.addLog({
          action: "Twitter に投稿",
          detail: message,
          noticeStatus: "ok",
        })
      )
    })
  }
}

const postYouTubeLiveChatRequest = (message: string): AppThunkAction => {
  return async (dispatch, getState) => {
    const youTubeData = getState().settings.youTubeData
    if (!youTubeData) {
      throw new Error("YouTube data required.")
    }
    if (!("activeLiveChatId" in youTubeData)) {
      throw new Error("No Live can not post chat.")
    }

    dispatch(actions.postYouTubeLiveChat.started())

    try {
      await postLiveChatMessage({
        liveChatId: youTubeData.activeLiveChatId,
        messageText: message,
      })
    } catch (error) {
      console.warn(error)
      const e = toSerializableErrorFromYouTubeAPIClientError(error)

      dispatch(
        logOperations.addLog({
          action: "YouTube Chat の投稿に失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.postYouTubeLiveChat.failed({ error: e }))
      return
    }

    batch(() => {
      dispatch(actions.postYouTubeLiveChat.done({}))

      dispatch(
        logOperations.addLog({
          action: "YouTube Chat に投稿",
          detail: message,
          noticeStatus: "ok",
        })
      )
    })
  }
}

export const postRateLikeRequest = (): AppThunkAction => {
  return async (dispatch, getState) => {
    const youTubeUrl = getState().settings.youTubeUrl
    if (!youTubeUrl) {
      throw new Error("YouTube URL required.")
    }

    try {
      await postRateLike(extractVideoIdByURL(youTubeUrl))
    } catch (error) {
      console.warn(error)
      const e = toSerializableErrorFromYouTubeAPIClientError(error)

      dispatch(
        logOperations.addLog({
          action: "YouTube の評価に失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.postYouTubeLiveChat.failed({ error: e }))
      return
    }

    dispatch(
      logOperations.addLog({
        action: "YouTube の評価完了",
        detail: "[高く評価した動画] に追加されました",
        noticeStatus: "ok",
      })
    )
  }
}
