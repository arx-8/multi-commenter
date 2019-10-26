import produce from "immer"
import { Action, Reducer } from "redux"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  tweetSuffix: string
  ui: {
    postTweet: {
      isLoading: boolean
      errorMsg: string
    }
    postYouTubeLiveChat: {
      isLoading: boolean
      errorMsg: string
    }
  }
}>

export const initialState: State = {
  tweetSuffix: "",
  ui: {
    postTweet: {
      isLoading: false,
      errorMsg: "",
    },
    postYouTubeLiveChat: {
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
   * tweetSuffix
   */
  if (isType(action, actions.onChangeTweetSuffix)) {
    return produce(state, (draft) => {
      draft.tweetSuffix = action.payload
    })
  }

  /**
   * postTweet
   */
  if (isType(action, actions.postTweet.started)) {
    return produce(state, (draft) => {
      draft.ui.postTweet.isLoading = true
      draft.ui.postTweet.errorMsg = ""
    })
  }
  if (isType(action, actions.postTweet.done)) {
    return produce(state, (draft) => {
      draft.ui.postTweet.isLoading = false
      draft.ui.postTweet.errorMsg = ""
    })
  }
  if (isType(action, actions.postTweet.failed)) {
    return produce(state, (draft) => {
      draft.ui.postTweet.isLoading = false
      draft.ui.postTweet.errorMsg = action.payload.error.message
    })
  }

  /**
   * postYouTubeLiveChat
   */
  if (isType(action, actions.postYouTubeLiveChat.started)) {
    return produce(state, (draft) => {
      draft.ui.postYouTubeLiveChat.isLoading = true
      draft.ui.postYouTubeLiveChat.errorMsg = ""
    })
  }
  if (isType(action, actions.postYouTubeLiveChat.done)) {
    return produce(state, (draft) => {
      draft.ui.postYouTubeLiveChat.isLoading = false
      draft.ui.postYouTubeLiveChat.errorMsg = ""
    })
  }
  if (isType(action, actions.postYouTubeLiveChat.failed)) {
    return produce(state, (draft) => {
      draft.ui.postYouTubeLiveChat.isLoading = false
      draft.ui.postYouTubeLiveChat.errorMsg = action.payload.error.message
    })
  }

  return state
}
