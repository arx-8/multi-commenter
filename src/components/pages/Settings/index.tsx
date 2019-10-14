/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import LinkIcon from "@material-ui/icons/Link"
import LinkOffIcon from "@material-ui/icons/LinkOff"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { TwitterIcon } from "src/components/atoms/TwitterIcon"
import { YouTubeIcon } from "src/components/atoms/YouTubeIcon"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { headerIconColor } from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"
import { authOperations, authSelectors } from "src/store/auth"
import { RootState } from "src/store/store"

type OwnProps = {
  children?: never
}

export const Settings: React.FC<OwnProps> = () => {
  const dispatch = useDispatch()
  const isAuthorizedTwitter = useSelector((state: RootState) =>
    authSelectors.isAuthorizedTwitter(state.auth)
  )
  const isAuthorizedGoogle = useSelector(
    (state: RootState) => state.auth.google.isAuthorized
  )
  const isAuthorizingGoogle = useSelector(
    (state: RootState) => state.auth.ui.google.isAuthorizing
  )
  const history = useHistory()

  return (
    <div css={root}>
      <Header>
        <IconButtonWithTooltip
          onClick={() => {
            history.push(RoutePath.Root)
          }}
          tooltipMessage="戻る"
        >
          <ArrowBackIcon css={headerIconColor} />
        </IconButtonWithTooltip>
      </Header>

      <div css={buttons}>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            dispatch(authOperations.twitterSignIn())
          }}
          disabled={isAuthorizedTwitter}
        >
          Twitter連携認証
          <TwitterIcon />
        </Button>
        {isAuthorizedTwitter ? <LinkIcon /> : <LinkOffIcon />}
      </div>

      <div css={buttons}>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            dispatch(authOperations.googleSignIn())
          }}
          disabled={isAuthorizedGoogle || isAuthorizingGoogle}
        >
          YouTube連携認証
          <YouTubeIcon />
        </Button>
        {isAuthorizedGoogle ? <LinkIcon /> : <LinkOffIcon />}
      </div>

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(authOperations.twitterSignOut())
            dispatch(authOperations.googleSignOut())
          }}
        >
          連携解除
          <DeleteIcon />
        </Button>
      </div>
    </div>
  )
}

const root = css``

const buttons = css`
  display: flex;
  align-items: center;
`
