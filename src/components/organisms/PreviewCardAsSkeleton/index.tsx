/** @jsx jsx */
import { jsx } from "@emotion/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from "@material-ui/core/styles"
import Skeleton from "@material-ui/lab/Skeleton"
import React from "react"

type OwnProps = {
  children?: never
}

const useStyles = makeStyles({
  card: {
    width: "100%",
  },
  media: {
    height: 140,
  },
})

export const PreviewCardAsSkeleton: React.FC<OwnProps> = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      {/* TODO enable animate if loading */}
      <Skeleton disableAnimate variant="rect" className={classes.media} />

      <CardContent>
        <React.Fragment>
          <Skeleton disableAnimate width="60%" />
          <Skeleton disableAnimate height={6} />
          <Skeleton disableAnimate height={6} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  )
}
