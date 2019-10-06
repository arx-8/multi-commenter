import { APP_NAME } from "src/constants/App"
import { CreateOAuthTokensResponse } from "src/data/apis/MultiCommenterAPIClient/types"
import { SerializableError } from "src/domain/errors/SerializableError"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  // Twitter
  TWITTER_SIGN_IN: "auth/TWITTER_SIGN_IN",
  TWITTER_SIGN_OUT: "auth/TWITTER_SIGN_OUT",
} as const

const create = actionCreatorFactory(APP_NAME)

export const twitterSignIn = create.async<
  void,
  Omit<CreateOAuthTokensResponse, "authenticate_url">,
  SerializableError
>(ActionTypes.TWITTER_SIGN_IN)

export const twitterSignOut = create.async<void, void, SerializableError>(
  ActionTypes.TWITTER_SIGN_OUT
)
