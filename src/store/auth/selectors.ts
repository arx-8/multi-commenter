import { State } from "./reducers"

export const isAuthorizedTwitter = (state: State): boolean => {
  return !!state.twitter.accessTokens
}

export const isAllAuthorized = (state: State): boolean => {
  return isAuthorizedTwitter(state) && state.google.isAuthorized
}
