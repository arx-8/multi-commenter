import { RootState } from "src/store/store"

export const isAuthorizedTwitter = (rootState: RootState): boolean => {
  const s = rootState.auth
  return !!s.twitter.accessTokens
}

export const isAllAuthorized = (rootState: RootState): boolean => {
  const s = rootState.auth
  return isAuthorizedTwitter(rootState) && s.google.isAuthorized
}
