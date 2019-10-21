/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const Log: React.FC<OwnProps> = () => {
  return <div css={root}>The log</div>
}

const root = css``
