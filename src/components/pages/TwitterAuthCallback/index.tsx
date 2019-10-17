/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { CircularProgress } from "@material-ui/core"
import { parse } from "querystring"
import React from "react"
import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router"
import { RoutePath } from "src/constants/RoutePaths"
import { TwitterOAuthCallbackQueryParams } from "src/domain/models/Twitter"
import { authOperations } from "src/store/auth"

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
  const dispatch = useDispatch()

  // @see https://github.com/ljharb/qs/issues/177
  const queryParams = parse(
    location.search.slice(1)
  ) as TwitterOAuthCallbackQueryParams

  if ("oauth_verifier" in queryParams) {
    dispatch(authOperations.twitterSignInFinalize(queryParams.oauth_verifier))
  } else {
    // 拒否された場合
    console.log("auth denied")

    history.replace(RoutePath.Settings)
  }

  return (
    <div css={root}>
      <CircularProgress />
    </div>
  )
}

const root = css`
  text-align: center;
`
