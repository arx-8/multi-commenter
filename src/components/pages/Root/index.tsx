/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import BuildIcon from "@material-ui/icons/Build"
import SendIcon from "@material-ui/icons/Send"
import React from "react"
import { useHistory } from "react-router"
import { InputPost } from "src/components/organisms/InputPost"
import { InputUrl } from "src/components/organisms/InputUrl"
import { RoutePath } from "src/constants/RoutePaths"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const history = useHistory()

  return (
    <div css={root}>
      <div>
        <Button
          variant="contained"
          color="default"
          onClick={() => history.push(RoutePath.Settings)}
        >
          設定
          <BuildIcon />
        </Button>
      </div>

      <InputUrl
        onSubmit={(value) => {
          console.log(value)
        }}
      />

      <div>
        <InputPost
          onChange={(text) => {
            console.log(text)
          }}
        />
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("TODO")
          }}
        >
          投稿
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}

const root = css``
