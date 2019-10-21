/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Typography } from "@material-ui/core"
import React from "react"
import { checkRemainingStatus } from "src/utils/CommentUtils"

type OwnProps = {
  children?: never
  remainingNum: number
}

export const RemainingNumCounter: React.FC<OwnProps> = ({ remainingNum }) => {
  const rootCss = cssSelector[checkRemainingStatus(remainingNum)]

  return (
    <Typography css={rootCss} variant="subtitle2">
      {`残り ${remainingNum} 文字`}
    </Typography>
  )
}

const ok = css``

const warn = css`
  color: darkorange;
`

const error = css`
  color: red;
`

// 簡易 pattern match
const cssSelector = {
  ok,
  warn,
  error,
}
