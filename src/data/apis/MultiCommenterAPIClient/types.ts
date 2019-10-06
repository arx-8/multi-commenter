import {
  TwitterOauthTokenKey,
  TwitterOauthTokenSecret,
  TwitterOauthVerifier,
} from "src/domain/models/Twitter"

export type CreateOAuthTokensRequestParams = {
  callback_url: string
}

export type CreateOAuthTokensResponse = {
  authenticate_url: string
  oauth_token_key: TwitterOauthTokenKey
  oauth_token_secret: TwitterOauthTokenSecret
}

export type Req2 = {
  callback_url: string
  oauth_token_key: TwitterOauthTokenKey
  oauth_token_secret: TwitterOauthTokenSecret
  oauth_verifier: TwitterOauthVerifier
}
