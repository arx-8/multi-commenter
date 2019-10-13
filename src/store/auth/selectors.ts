import { State } from "./reducers"

export const isAuthorizedTwitter = (state: State): boolean => {
  return !!state.twitter.accessTokens
}
