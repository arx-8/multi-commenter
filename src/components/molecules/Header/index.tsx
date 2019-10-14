import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import React, { ReactNode } from "react"

type OwnProps = {
  children: ReactNode
}

export const Header: React.FC<OwnProps> = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  )
}
