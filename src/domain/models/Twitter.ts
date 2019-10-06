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
