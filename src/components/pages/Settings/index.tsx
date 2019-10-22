/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Button } from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import React, { Fragment } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { TwitterIcon } from "src/components/atoms/TwitterIcon"
import { YouTubeIcon } from "src/components/atoms/YouTubeIcon"
import { Content } from "src/components/molecules/Content"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import {
  headerIconColor,
  logoColorTwitter,
  logoColorYouTube,
} from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"
import { authOperations, authSelectors } from "src/store/auth"
import { RootState } from "src/store/store"

type OwnProps = {
  children?: never
}

export const Settings: React.FC<OwnProps> = () => {
  const dispatch = useDispatch()
  const isAuthorizedTwitter = useSelector(authSelectors.isAuthorizedTwitter)
  const isAuthorizedGoogle = useSelector(
    (state: RootState) => state.auth.google.isAuthorized
  )
  const isAuthorizingGoogle = useSelector(
    (state: RootState) => state.auth.ui.google.isAuthorizing
  )
  const history = useHistory()

  return (
    <Fragment>
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

      <Content>
        <div css={buttons}>
          <Button
            css={btn}
            variant="contained"
            onClick={() => {
              dispatch(authOperations.twitterSignIn())
            }}
            disabled={isAuthorizedTwitter}
          >
            Twitter 連携認証
            <span css={[icon, isAuthorizedTwitter ? authedTwitter : unauthed]}>
              <TwitterIcon />
            </span>
          </Button>
        </div>

        <div css={[buttons, separator]}>
          <Button
            css={btn}
            variant="contained"
            onClick={() => {
              dispatch(authOperations.googleSignIn())
            }}
            disabled={isAuthorizedGoogle || isAuthorizingGoogle}
          >
            YouTube 連携認証
            <span css={[icon, isAuthorizedGoogle ? authedYouTube : unauthed]}>
              <YouTubeIcon />
            </span>
          </Button>
        </div>

        <div css={separator}>
          <Button
            css={btn}
            variant="contained"
            color="secondary"
            onClick={() => {
              batch(() => {
                dispatch(authOperations.twitterSignOut())
                dispatch(authOperations.googleSignOut())
              })
            }}
            disabled={!isAuthorizedGoogle && !isAuthorizedTwitter}
          >
            連携解除
            <DeleteIcon css={icon} />
          </Button>
        </div>
      </Content>
    </Fragment>
  )
}

const btn = css`
  text-transform: none !important;
`

const buttons = css`
  display: flex;
  align-items: center;
`

const separator = css`
  padding-top: 16px;
`

const icon = css`
  display: flex;
  padding-left: 8px;
`

const unauthed = css`
  fill: darkgray;
`

const authedTwitter = css`
  fill: ${logoColorTwitter};
`

const authedYouTube = css`
  fill: ${logoColorYouTube};
`
