export type TwitterOAuthCallbackQueryParams = {
  oauth_token: string
  oauth_verifier: string
  // 拒否された場合
  denied: string
}
