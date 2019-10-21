import {
  TwitterAccessTokenKey,
  TwitterAccessTokenSecret,
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

export type CreateAccessTokensRequestParams = {
  callback_url: string
  oauth_token_key: TwitterOauthTokenKey
  oauth_token_secret: TwitterOauthTokenSecret
  oauth_verifier: TwitterOauthVerifier
}

export type CreateAccessTokensResponse = {
  access_token_key: TwitterAccessTokenKey
  access_token_secret: TwitterAccessTokenSecret
}

export type PostTweetRequestParams = {
  access_token_key: TwitterAccessTokenKey
  access_token_secret: TwitterAccessTokenSecret
  tweet: string
}

export type PostTweetResponse = {
  result: "succeeded"
}

export type PostTweetResponseFailed = {
  code: number
  message: string
}[]
