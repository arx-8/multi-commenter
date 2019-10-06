import { ParsedUrlQuery } from "querystring"
import { Brand } from "src/types/Utils"

export type TwitterOauthTokenKey = Brand<string, "TwitterOauthTokenKey">
export type TwitterOauthVerifier = Brand<string, "TwitterOauthVerifier">

type TwitterOAuthCallbackQueryParamsAllowed = {
  oauth_token: TwitterOauthTokenKey
  oauth_verifier: TwitterOauthVerifier
}

/**
 * ユーザー操作で「キャンセル(拒否)」された場合
 */
type TwitterOAuthCallbackQueryParamsDenied = {
  denied: string
}

export const isTwitterOAuthCallbackAllowed = (
  params: ParsedUrlQuery
): params is TwitterOAuthCallbackQueryParamsAllowed => {
  return !!(params.oauth_token && params.oauth_verifier)
}

export const isTwitterOAuthCallbackDenied = (
  params: ParsedUrlQuery
): params is TwitterOAuthCallbackQueryParamsDenied => {
  return !!params.denied
}
