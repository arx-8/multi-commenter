/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { AppBar, Toolbar } from "@material-ui/core"
import React, { ReactNode } from "react"

type OwnProps = {
  children: ReactNode
}

export const Header: React.FC<OwnProps> = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar css={gutter} disableGutters variant="dense">
        {children}
      </Toolbar>
    </AppBar>
  )
}

const gutter = css`
  margin: 0 16px 0 16px;
`
