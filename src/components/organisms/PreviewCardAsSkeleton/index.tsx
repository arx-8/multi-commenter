/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Card, CardContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Skeleton from "@material-ui/lab/Skeleton"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "src/store/store"
import { CircularProgress } from "@material-ui/core"

type OwnProps = {
  children?: never
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
})

export const PreviewCardAsSkeleton: React.FC<OwnProps> = () => {
  const classes = useStyles()
  const isLoading = useSelector(
    (state: RootState) => state.settings.ui.youTubeData.isLoading
  )

  return (
    <div css={root}>
      {isLoading && (
        <div css={overlay}>
          <CircularProgress size={circularSizePx} />
        </div>
      )}

      <Card>
        <Skeleton disableAnimate variant="rect" className={classes.media} />

        <CardContent>
          <React.Fragment>
            <Skeleton disableAnimate width="60%" />
            <Skeleton disableAnimate height={6} />
            <Skeleton disableAnimate height={6} width="80%" />
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  )
}

const circularSizePx = 50

const root = css`
  width: 100%;
  position: relative;
`

const overlay = css`
  position: absolute;
  left: calc(50% - ${circularSizePx / 2}px);
  top: calc(50% - ${circularSizePx / 2}px);
`
