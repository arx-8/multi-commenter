/** @jsx jsx */
import { jsx } from "@emotion/core"
import BuildIcon from "@material-ui/icons/Build"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Content } from "src/components/molecules/Content"
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
    <Fragment>
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

      <Content>
        <InputPost
          onChange={(text) => {
            console.log(text)
          }}
        />
      </Content>
    </Fragment>
  )
}
