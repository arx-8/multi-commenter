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
      console.log(e)

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

    // 取得結果が想定外（終了済みライブ、存在しない、削除済み etc.）の場合
    // TODO

    batch(() => {
      dispatch(actions.setYouTubeUrl({ url }))
      dispatch(
        actions.fetchYouTubeActiveLive.done({
          result: extractYouTubeActiveLive(resp),
        })
      )

      dispatch(
        logOperations.addLog({
          action: "YouTube Live 読込完了",
          detail: "",
          noticeStatus: "ok",
        })
      )
    })
  }
}
