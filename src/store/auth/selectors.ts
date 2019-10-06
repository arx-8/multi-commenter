import { State } from "./reducers"

export const isAuthorized = (state: State): boolean => {
  return !!state.twitter.accessTokens
}
