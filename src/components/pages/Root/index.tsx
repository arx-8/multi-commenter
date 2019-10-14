/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import BuildIcon from "@material-ui/icons/Build"
import SendIcon from "@material-ui/icons/Send"
import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { InputPost } from "src/components/organisms/InputPost"
import { InputUrl } from "src/components/organisms/InputUrl"
import { headerIconColor } from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"
import { authSelectors } from "src/store/auth"
import { RootState } from "src/store/store"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const history = useHistory()
  const isAllAuthorized = useSelector((state: RootState) =>
    authSelectors.isAllAuthorized(state.auth)
  )

  return (
    <div css={root}>
      <Header>
        <InputUrl
          onSubmit={(value) => {
            console.log(value)
          }}
        />

        <IconButtonWithTooltip
          onClick={() => {
            history.push(RoutePath.Settings)
          }}
          tooltipMessage="設定"
          showBadge={!isAllAuthorized}
        >
          <BuildIcon css={headerIconColor} />
        </IconButtonWithTooltip>
      </Header>

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
