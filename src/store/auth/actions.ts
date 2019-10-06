import { APP_NAME } from "src/constants/App"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  // Twitter
  TWITTER_SIGN_IN: "auth/TWITTER_SIGN_IN",
  TWITTER_SIGN_OUT: "auth/TWITTER_SIGN_OUT",
}

const create = actionCreatorFactory(APP_NAME)
console.log(create)

// export const login = create(ActionTypes.LOGIN)
