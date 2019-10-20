import produce from "immer"
import { Action, Reducer } from "redux"
import { YouTubeActiveLive } from "src/domain/models/Google"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  youTubeData?: YouTubeActiveLive
  ui: {
    youTubeData: {
      isLoading: boolean
      errorMsg: string
    }
  }
}>

export const initialState: State = {
  ui: {
    youTubeData: {
      isLoading: false,
      errorMsg: "",
    },
  },
}

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  if (isType(action, actions.fetchYouTubeActiveLive.started)) {
    return produce(state, (draft) => {
      draft.ui.youTubeData.isLoading = true
      draft.ui.youTubeData.errorMsg = ""
    })
  }
  if (isType(action, actions.fetchYouTubeActiveLive.done)) {
    return produce(state, (draft) => {
      draft.youTubeData = action.payload.result

      draft.ui.youTubeData.isLoading = false
      const errorMsg = action.payload.result
        ? ""
        : "Live が読み込めませんでした。既にライブが終了しているか、不正な URL です。"
      draft.ui.youTubeData.errorMsg = errorMsg
    })
  }
  if (isType(action, actions.fetchYouTubeActiveLive.failed)) {
    return produce(state, (draft) => {
      draft.ui.youTubeData.isLoading = false
      draft.ui.youTubeData.errorMsg = action.payload.error.message
    })
  }

  return state
}
