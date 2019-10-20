/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
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

  return (
    <Card>
      <CardContent>
        <img
          css={thumb}
          src={youTubeData.thumbnailUrl}
          alt={youTubeData.title}
        />
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {youTubeData.title}
        </Typography>
        <Typography
          css={desc}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {youTubeData.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button css={btn} size="small" color="primary">
          <a href={youTubeUrl} target="_blank" rel="noopener noreferrer">
            YouTube で見る
          </a>
        </Button>
      </CardActions>
    </Card>
  )
}

const thumb = css`
  height: 100%;
  width: 100%;
`

const desc = css`
  white-space: pre-line;
`

const btn = css`
  text-transform: none;
`
