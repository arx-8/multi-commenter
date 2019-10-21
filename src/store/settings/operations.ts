import { batch } from "react-redux"
import { fetchVideoData } from "src/data/apis/GoogleAPIClient"
import { toSerializableError } from "src/domain/errors/SerializableError"
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
      console.log(error)

      dispatch(
        actions.fetchYouTubeActiveLive.failed({
          error: toSerializableError(error),
        })
      )
      return
    }

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
        })
      )
    })
  }
}
