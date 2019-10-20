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
  /**
   * Twitter
   */
  if (isType(action, actions.loadVideo.started)) {
    return produce(state, () => {})
  }

  return state
}
