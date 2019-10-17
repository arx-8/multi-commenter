/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React from "react"

type OwnProps = {
  children?: never
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
})

export const PreviewCard: React.FC<OwnProps> = () => {
  const classes = useStyles()

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button css={btn} size="small" color="primary">
          YouTube で見る
        </Button>
      </CardActions>
    </Card>
  )
}

const btn = css`
  text-transform: none;
`
