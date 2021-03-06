/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import BuildIcon from "@material-ui/icons/Build"
import HelpIcon from "@material-ui/icons/Help"
import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Content } from "src/components/molecules/Content"
import { Header } from "src/components/molecules/Header"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { InputPost } from "src/components/organisms/InputPost"
import { InputUrl } from "src/components/organisms/InputUrl"
import { LogView } from "src/components/organisms/LogView"
import { PreviewCard } from "src/components/organisms/PreviewCard"
import { PreviewCardAsSkeleton } from "src/components/organisms/PreviewCardAsSkeleton"
import { headerIconColor } from "src/components/styles/styles"
import { RoutePath } from "src/constants/RoutePaths"
import { authSelectors } from "src/store/auth"
import { settingsOperations, settingsSelectors } from "src/store/settings"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const isLoadedYouTubeData = useSelector(settingsSelectors.isLoadedYouTubeData)
  const isAllAuthorized = useSelector(authSelectors.isAllAuthorized)

  return (
    <Fragment>
      <Header>
        <InputUrl
          onSubmit={(url) => {
            dispatch(settingsOperations.fetchYouTubeActiveLive(url))
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
        <IconButtonWithTooltip
          onClick={() => {
            history.push(RoutePath.Help)
          }}
          tooltipMessage="ヘルプ"
        >
          <HelpIcon css={headerIconColor} />
        </IconButtonWithTooltip>
      </Header>

      <Content>
        <div css={previewCard}>
          {isLoadedYouTubeData ? <PreviewCard /> : <PreviewCardAsSkeleton />}
        </div>

        <div css={separator}>
          <InputPost />
        </div>

        <div css={separator}>
          <LogView />
        </div>
      </Content>
    </Fragment>
  )
}

const previewCard = css`
  display: flex;
  justify-content: center;
`

const separator = css`
  padding-top: 16px;
`
