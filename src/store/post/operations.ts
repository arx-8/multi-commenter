import { batch } from "react-redux"
import {
  postLiveChatMessage,
  postRateLike,
} from "src/data/apis/GoogleAPIClient"
import { postTweet } from "src/data/apis/MultiCommenterAPIClient"
import {
  toSerializableError,
  toSerializableErrorFromYouTubeAPIClientError,
} from "src/domain/errors/SerializableError"
import { extractVideoIdByURL } from "src/domain/models/Google"
import { TweetText } from "src/domain/models/Twitter"
import { logOperations } from "src/store/log"
import { AppThunkAction } from "src/types/ReduxTypes"
import { concatAsTweet } from "src/utils/CommentUtils"
import * as actions from "./actions"

export const post = (main: string, suffix: string): AppThunkAction<void> => {
  return (dispatch) => {
    dispatch(postTweetRequest(concatAsTweet(main, suffix)))
    dispatch(postYouTubeLiveChatRequest(main))
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
    } catch (error) {
      const e = toSerializableError(error)
      console.warn(e)

      dispatch(
        logOperations.addLog({
          action: "Twitter の投稿に失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
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
      const e = toSerializableErrorFromYouTubeAPIClientError(error)
      console.warn(e)

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
      const e = toSerializableErrorFromYouTubeAPIClientError(error)
      console.warn(e)

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
