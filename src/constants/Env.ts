import { GoogleApiApiKey, GoogleApiClientId } from "src/domain/models/Google"

export const isDevelopment = process.env.NODE_ENV !== "production"

export const TWITTER_CALLBACK_URL = process.env.REACT_APP_TWITTER_CALLBACK_URL!

export const GOOGLE_API_API_KEY = process.env
  .REACT_APP_GOOGLE_API_API_KEY! as GoogleApiApiKey

export const GOOGLE_API_CLIENT_ID = process.env
  .REACT_APP_GOOGLE_API_CLIENT_ID! as GoogleApiClientId

if (isDevelopment) {
  if (
    [TWITTER_CALLBACK_URL, GOOGLE_API_API_KEY, GOOGLE_API_CLIENT_ID].some(
      (x) => x == null || x.trim().length === 0
    )
  ) {
    throw new Error("Undefined env variable found")
  }
}
