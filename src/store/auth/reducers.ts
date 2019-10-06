import produce from "immer"
import { Action, Reducer } from "redux"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  twitter: {
    isAuthorized: boolean
  }
  ui: {
    twitter: {
      isAuthorizing: boolean
      errorMsg: string
    }
  }
}>

export const initialState: State = {
  twitter: {
    isAuthorized: false,
  },
  ui: {
    twitter: {
      isAuthorizing: false,
      errorMsg: "",
    },
  },
}

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  if (isType(action, actions.twitterSignIn.started)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = true
      draft.ui.twitter.errorMsg = ""
    })
  }
  if (isType(action, actions.twitterSignIn.done)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = false
    })
  }
  if (isType(action, actions.twitterSignIn.failed)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = false
      draft.ui.twitter.errorMsg = action.payload.error.message
    })
  }

  return state
}
