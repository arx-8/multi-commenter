import { batch } from "react-redux"
import { fetchVideoData } from "src/data/apis/GoogleAPIClient"
import { toSerializableErrorFromYouTubeAPIClientError } from "src/domain/errors/SerializableError"
import {
  extractVideoIdByURL,
  extractYouTubeActiveLive,
} from "src/domain/models/Google"
import { logOperations } from "src/store/log"
import { AppThunkAction } from "src/types/ReduxTypes"
import * as actions from "./actions"

export const fetchYouTubeActiveLive = (url: string): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.fetchYouTubeActiveLive.started())

    let resp: gapi.client.youtube.VideoListResponse
    try {
      resp = await fetchVideoData({
        videoId: extractVideoIdByURL(url),
      })
    } catch (error) {
      const e = toSerializableErrorFromYouTubeAPIClientError(error)
      console.warn(e)

      dispatch(
        logOperations.addLog({
          action: "YouTube Live の取得に失敗",
          detail: e.message,
          noticeStatus: "error",
        })
      )
      dispatch(actions.fetchYouTubeActiveLive.failed({ error: e }))
      return
    }

    // 取得結果が想定外の場合 (存在しない or 削除済み)
    const youTubeData = extractYouTubeActiveLive(resp)
    if (
      !resp.pageInfo ||
      resp.pageInfo.resultsPerPage == null ||
      resp.pageInfo!.resultsPerPage === 0 ||
      !youTubeData
    ) {
      dispatch(
        logOperations.addLog({
          action: "YouTube Live の取得に失敗",
          detail: "動画が存在しないかアクセスできません",
          noticeStatus: "error",
        })
      )
      return
    }

    // OK
    batch(() => {
      dispatch(actions.setYouTubeUrl({ url }))
      dispatch(
        actions.fetchYouTubeActiveLive.done({
          result: youTubeData,
        })
      )

      if ("activeLiveChatId" in youTubeData) {
        dispatch(
          logOperations.addLog({
            action: "YouTube Live 読込完了",
            detail: "",
            noticeStatus: "ok",
          })
        )
      } else {
        dispatch(
          logOperations.addLog({
            action: "YouTube 読込完了 (チャット投稿不可)",
            detail: "ライブでないため、チャットの投稿はできません",
            noticeStatus: "warn",
          })
        )
      }
    })
  }
}
