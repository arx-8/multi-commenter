import produce from "immer"
import { Action, Reducer } from "redux"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  ui: {
    post: {
      isLoading: boolean
      errorMsg: string
    }
  }
}>

export const initialState: State = {
  ui: {
    post: {
      isLoading: false,
      errorMsg: "",
    },
  },
}

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  if (isType(action, actions.post.started)) {
    return produce(state, (draft) => {
      draft.ui.post.isLoading = true
      draft.ui.post.errorMsg = ""
    })
  }
  if (isType(action, actions.post.done)) {
    return produce(state, (draft) => {
      draft.ui.post.isLoading = false
      draft.ui.post.errorMsg = ""
    })
  }
  if (isType(action, actions.post.failed)) {
    return produce(state, (draft) => {
      draft.ui.post.isLoading = false
      draft.ui.post.errorMsg = action.payload.error.message
    })
  }

  return state
}
