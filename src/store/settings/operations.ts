import { fetchVideoData } from "src/data/apis/GoogleAPIClient"
import { FetchVideoDataRequestParams } from "src/data/apis/GoogleAPIClient/types"
import { toSerializableError } from "src/domain/errors/SerializableError"
import { extractYouTubeActiveLive } from "src/domain/models/Google"
import { AppThunkAction } from "src/types/ReduxTypes"
import * as actions from "./actions"

export const fetchYouTubeActiveLive = (
  params: FetchVideoDataRequestParams
): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.fetchYouTubeActiveLive.started())

    let resp
    try {
      resp = await fetchVideoData(params)
    } catch (error) {
      console.log(error)

      dispatch(
        actions.fetchYouTubeActiveLive.failed({
          error: toSerializableError(error),
        })
      )
      return
    }

    dispatch(
      actions.fetchYouTubeActiveLive.done({
        result: extractYouTubeActiveLive(resp),
      })
    )
  }
}
