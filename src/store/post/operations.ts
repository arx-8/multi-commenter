import { toSerializableError } from "src/domain/errors/SerializableError"
import { AppThunkAction } from "src/types/ReduxTypes"
import * as actions from "./actions"

export const post = (): AppThunkAction => {
  return async (dispatch) => {
    dispatch(actions.post.started())

    // let resp
    try {
      // resp = await fetchVideoData({
      //   videoId: extractVideoIdByURL(url),
      // })
    } catch (error) {
      console.log(error)

      dispatch(
        actions.post.failed({
          error: toSerializableError(error),
        })
      )
      return
    }

    // dispatch(
    //   actions.post.done({
    //     result: undefined
    //   })
    // )
  }
}
