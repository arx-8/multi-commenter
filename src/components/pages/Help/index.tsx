/** @jsx jsx */
import { jsx } from "@emotion/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React, { Fragment } from "react"
import { useHistory } from "react-router"
import { Content } from "src/components/molecules/Content"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { headerIconColor } from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"

type OwnProps = {
  children?: never
}

export const Help: React.FC<OwnProps> = () => {
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
      <Content>TODO</Content>
    </Fragment>
  )
}
