/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
} from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { RootState } from "src/store/store"

type OwnProps = {
  children?: never
}

export const PreviewCard: React.FC<OwnProps> = () => {
  const youTubeUrl = useSelector(
    // この処理到達時点で必ず存在するため、!
    (state: RootState) => state.settings.youTubeUrl!
  )
  const youTubeData = useSelector(
    // この処理到達時点で必ず存在するため、!
    (state: RootState) => state.settings.youTubeData!
  )

  const [isOpenDesc, setIsOpenDesc] = useState(false)

  return (
    <Card>
      <div css={padding}>
        <img
          css={thumb}
          src={youTubeData.thumbnailUrl}
          alt={youTubeData.title}
        />
      </div>
      <CardContent css={padding}>
        <Typography gutterBottom variant="h6">
          {youTubeData.title}
        </Typography>
        <Collapse in={isOpenDesc} collapsedHeight="40px">
          <Typography
            css={desc}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {youTubeData.description}
          </Typography>
        </Collapse>
      </CardContent>
      <CardActions css={actions}>
        <Button css={btn} size="small" color="primary">
          <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
            YouTube で見る
          </a>
        </Button>
        <div css={opener}>
          {isOpenDesc ? (
            <IconButtonWithTooltip
              onClick={() => {
                setIsOpenDesc(false)
              }}
              tooltipMessage="閉じる"
            >
              <ExpandLessIcon fontSize="large" />
            </IconButtonWithTooltip>
          ) : (
            <IconButtonWithTooltip
              onClick={() => {
                setIsOpenDesc(true)
              }}
              tooltipMessage="開く"
            >
              <ExpandMoreIcon fontSize="large" />
            </IconButtonWithTooltip>
          )}
        </div>
      </CardActions>
    </Card>
  )
}

const padding = css`
  padding: 8px;
`

const thumb = css`
  height: 100%;
  width: 100%;
`

const desc = css`
  white-space: pre-line;
`

const actions = css`
  position: relative;
  width: 100%;
`

const opener = css`
  /* 中央に開閉ボタン表示するため */
  position: absolute;
  left: 42%;
`

const btn = css`
  text-transform: none;
`
