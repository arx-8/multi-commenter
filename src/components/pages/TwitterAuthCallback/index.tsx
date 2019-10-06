/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { parse } from "querystring"
import React from "react"
import { useHistory, useLocation } from "react-router"
import { RoutePath } from "src/constants/RoutePaths"
import {
  isTwitterOAuthCallbackAllowed,
  isTwitterOAuthCallbackDenied,
} from "src/domain/models/Twitter"

type OwnProps = {
  children?: never
}

/**
 * Twitter認証コールバックの受け取り
 * こんな URL: {HOST}/twitter-auth-callback?oauth_token=XXX&oauth_verifier=XXX
 */
export const TwitterAuthCallback: React.FC<OwnProps> = () => {
  const history = useHistory()
  const location = useLocation()

  // @see https://github.com/ljharb/qs/issues/177
  const queryParams = parse(location.search.slice(1))

  if (isTwitterOAuthCallbackAllowed(queryParams)) {
    // クエリパラメータを取り込み終わったら、クエリパラメータを消すため遷移
    // 「戻る」ができると再度ここの処理が無駄に走るため、履歴は残さない

    // TODO
    console.log(queryParams)

    history.replace(RoutePath.Root)
  }

  // 拒否された場合
  if (isTwitterOAuthCallbackDenied(queryParams)) {
    console.log("auth denied")

    history.replace(RoutePath.Settings)
  }

  return <div css={root}>Loading</div>
}

const root = css``
