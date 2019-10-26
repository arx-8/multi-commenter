import { Brand } from "src/types/Utils"

// AccessToken 取得のための使い捨て
export type TwitterOauthTokenKey = Brand<string, "TwitterOauthTokenKey">
export type TwitterOauthTokenSecret = Brand<string, "TwitterOauthTokenSecret">
export type TwitterOauthVerifier = Brand<string, "TwitterOauthVerifier">

// 再利用可能
export type TwitterAccessTokenKey = Brand<string, "TwitterAccessTokenKey">
export type TwitterAccessTokenSecret = Brand<string, "TwitterAccessTokenSecret">

export type TwitterOAuthCallbackQueryParams = AuthAllowed | AuthDenied

type AuthAllowed = {
  oauth_token: TwitterOauthTokenKey
  oauth_verifier: TwitterOauthVerifier
}

/**
 * ユーザー操作で「キャンセル(拒否)」された場合
 */
type AuthDenied = {
  denied: string
}

/**
 * ツイート本文
 */
export type TweetText = Brand<string, "TweetText">

/**
 * トークンが無効 or リミットエラー or アプリ BAN
 */
type TwitterApiErrorOfInvalidOrExpiredToken = [
  {
    code: 89
    message: "Invalid or expired token."
  }
]

/**
 * 直近のツイートと完全一致する投稿はNG
 */
type TwitterApiErrorOfDuplicate = [
  {
    code: 187
    message: "Status is a duplicate."
  }
]

export type TwitterApiError = Partial<
  TwitterApiErrorOfInvalidOrExpiredToken | TwitterApiErrorOfDuplicate
>
