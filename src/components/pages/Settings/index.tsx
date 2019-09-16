/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import LinkIcon from "@material-ui/icons/Link"
import LinkOffIcon from "@material-ui/icons/LinkOff"
import { TwitterIcon } from "components/atoms/TwitterIcon"
import { YouTubeIcon } from "components/atoms/YouTubeIcon"
import { useGoogleAuth } from "components/helpers/useGoogleAuth"
import { RoutePath } from "constants/RoutePaths"
import React from "react"
import useReactRouter from "use-react-router"

type OwnProps = {
  children?: never
}

export const Settings: React.FC<OwnProps> = () => {
  const { isGoogleAuthorized, signIn, disconnect } = useGoogleAuth()
  const isGoogleAuthed = isGoogleAuthorized()

  const { history } = useReactRouter()

  return (
    <div css={root}>
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            history.push(RoutePath.Root)
          }}
        >
          戻る
          <ArrowBackIcon />
        </Button>
      </div>

      <div>
        <Button variant="contained" color="default">
          Twitter連携認証
          <TwitterIcon />
        </Button>
      </div>

      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => {
            signIn()
          }}
          disabled={isGoogleAuthed}
        >
          YouTube連携認証
          <YouTubeIcon />
        </Button>
        {isGoogleAuthed ? <LinkIcon /> : <LinkOffIcon />}
      </div>

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            disconnect()
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
