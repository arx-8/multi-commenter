/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import React, { useState } from "react"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"
import { likedColor } from "src/components/styles/styles"
import { postOperations } from "src/store/post"
import { useDispatch } from "react-redux"

type OwnProps = {
  children?: never
}

/**
 * 高く評価以外しなくていい
 */
export const LikeButton: React.FC<OwnProps> = () => {
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)

  return (
    <IconButtonWithTooltip
      disabled={isLiked}
      onClick={() => {
        setIsLiked(true)
        dispatch(postOperations.postRateLikeRequest())
      }}
      tooltipMessage="高く評価"
    >
      <ThumbUpAltIcon css={isLiked && icon} fontSize="large" />
    </IconButtonWithTooltip>
  )
}

const icon = css`
  color: ${likedColor};
`
