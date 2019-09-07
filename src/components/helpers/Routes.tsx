import { NotFound } from "components/pages/NotFound"
import { Root } from "components/pages/Root"
import { RoutePath } from "constants/RoutePaths"
import React from "react"
import { Route, Switch } from "react-router-dom"

type OwnProps = {
  children?: never
}

export const Routes: React.FC<OwnProps> = () => {
  return (
    <Switch>
      <Route exact path={RoutePath.Root} component={Root} />

      {/* No route */}
      <Route component={NotFound} />
    </Switch>
  )
}
