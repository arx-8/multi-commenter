import { APP_NAME } from "constants/App"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  // Google
  GOOGLE_AUTH_INIT: "auth/GOOGLE_AUTH_INIT",
  GOOGLE_SIGN_IN: "auth/GOOGLE_SIGN_IN",
  GOOGLE_SIGN_OUT: "auth/GOOGLE_SIGN_OUT",
  // Twitter
  TWITTER_SIGN_IN: "auth/TWITTER_SIGN_IN",
  TWITTER_SIGN_OUT: "auth/TWITTER_SIGN_OUT",
}

const create = actionCreatorFactory(APP_NAME)
console.log(create)

// export const login = create(ActionTypes.LOGIN)
