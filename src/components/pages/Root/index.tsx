/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import BuildIcon from "@material-ui/icons/Build"
import SendIcon from "@material-ui/icons/Send"
import React from "react"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <div>
        <Button variant="contained" color="default">
          設定
          <BuildIcon />
        </Button>
      </div>

      <div>
        <input type="text" />
      </div>

      <div>
        <Button variant="contained" color="primary">
          投稿
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}

const root = css``
