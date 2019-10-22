import produce from "immer"
import { Action, Reducer } from "redux"
import {
  TwitterAccessTokenKey,
  TwitterAccessTokenSecret,
  TwitterOauthTokenKey,
  TwitterOauthTokenSecret,
} from "src/domain/models/Twitter"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  twitter: {
    oauthTokens?: {
      oauth_token_key: TwitterOauthTokenKey
      oauth_token_secret: TwitterOauthTokenSecret
    }
    accessTokens?: {
      access_token_key: TwitterAccessTokenKey
      access_token_secret: TwitterAccessTokenSecret
    }
  }
  google: {
    isAuthorized: boolean
  }
  ui: {
    twitter: {
      isAuthorizing: boolean
      errorMsg: string
    }
    google: {
      isAuthorizing: boolean
      errorMsg: string
    }
  }
}>

export const initialState: State = {
  twitter: {},
  google: {
    isAuthorized: false,
  },
  ui: {
    twitter: {
      isAuthorizing: false,
      errorMsg: "",
    },
    google: {
      isAuthorizing: false,
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
  if (isType(action, actions.twitterSignIn.started)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = true
      draft.ui.twitter.errorMsg = ""
    })
  }
  if (isType(action, actions.twitterSignIn.done)) {
    return produce(state, (draft) => {
      const { oauth_token_key, oauth_token_secret } = action.payload.result
      draft.ui.twitter.isAuthorizing = false
      draft.twitter.oauthTokens = {
        oauth_token_key,
        oauth_token_secret,
      }
    })
  }

  if (isType(action, actions.twitterSignInFinalize.started)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = true
      draft.ui.twitter.errorMsg = ""
    })
  }
  if (isType(action, actions.twitterSignInFinalize.done)) {
    return produce(state, (draft) => {
      const { access_token_key, access_token_secret } = action.payload.result
      draft.ui.twitter.isAuthorizing = false
      draft.twitter.accessTokens = {
        access_token_key,
        access_token_secret,
      }
      // oauthTokens は使い捨て
      draft.twitter.oauthTokens = undefined
    })
  }

  if (
    isType(action, actions.twitterSignIn.failed) ||
    isType(action, actions.twitterSignInFinalize.failed)
  ) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = false
      draft.ui.twitter.errorMsg = action.payload.error.message
      draft.twitter.oauthTokens = undefined
    })
  }

  if (isType(action, actions.twitterSignOut)) {
    return produce(state, (draft) => {
      draft.ui.twitter.isAuthorizing = false
      draft.ui.twitter.errorMsg = ""
      draft.twitter.accessTokens = undefined
      draft.twitter.oauthTokens = undefined
    })
  }

  /**
   * Google
   */
  if (isType(action, actions.googleSignIn.started)) {
    return produce(state, (draft) => {
      draft.ui.google.isAuthorizing = true
      draft.ui.google.errorMsg = ""
    })
  }
  if (isType(action, actions.googleSignIn.done)) {
    return produce(state, (draft) => {
      draft.ui.google.isAuthorizing = false
      draft.google.isAuthorized = true
    })
  }
  if (isType(action, actions.googleSignIn.failed)) {
    return produce(state, (draft) => {
      draft.ui.google.isAuthorizing = false
      draft.ui.google.errorMsg = action.payload.error.message
      draft.google.isAuthorized = false
    })
  }

  if (isType(action, actions.googleSignOut)) {
    return produce(state, (draft) => {
      draft.ui.google.isAuthorizing = false
      draft.ui.google.errorMsg = ""
      draft.google.isAuthorized = false
    })
  }

  if (isType(action, actions.googleSetIsAuthorized)) {
    return produce(state, (draft) => {
      draft.google.isAuthorized = action.payload
    })
  }

  return state
}
