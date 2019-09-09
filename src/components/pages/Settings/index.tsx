/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import { TwitterIcon } from "components/atoms/TwitterIcon"
import { YouTubeIcon } from "components/atoms/YouTubeIcon"
import React from "react"

type OwnProps = {
  children?: never
}

export const Settings: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <div>
        <Button variant="contained" color="default">
          Twitter連携認証
          <TwitterIcon />
        </Button>
      </div>

      <div>
        <Button variant="contained" color="default">
          YouTube連携認証
          <YouTubeIcon />
        </Button>
      </div>

      <div>
        <Button variant="contained" color="secondary">
          連携解除
          <DeleteIcon />
        </Button>
      </div>
    </div>
  )
}

const root = css``
