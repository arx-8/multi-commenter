/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { ReactNode } from "react"

type OwnProps = {
  children: ReactNode
}

export const Content: React.FC<OwnProps> = ({ children }) => {
  return <div css={root}>{children}</div>
}

const root = css`
  padding: 16px;
`
