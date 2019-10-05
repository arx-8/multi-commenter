/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import DeleteIcon from "@material-ui/icons/Delete"
import LinkIcon from "@material-ui/icons/Link"
import LinkOffIcon from "@material-ui/icons/LinkOff"
import React from "react"
import { useHistory } from "react-router"
import { TwitterIcon } from "src/components/atoms/TwitterIcon"
import { YouTubeIcon } from "src/components/atoms/YouTubeIcon"
import { RoutePath } from "src/constants/RoutePaths"

type OwnProps = {
  children?: never
}

export const Settings: React.FC<OwnProps> = () => {
  const history = useHistory()

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
            console.log("TODO")
          }}
        >
          YouTube連携認証
          <YouTubeIcon />
        </Button>
        {Math.floor(Math.random() * 10) % 2 ? <LinkIcon /> : <LinkOffIcon />}
      </div>

      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log("TODO")
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
