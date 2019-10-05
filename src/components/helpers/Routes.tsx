import React from "react"
import { Route, Switch } from "react-router-dom"
import { NotFound } from "src/components/pages/NotFound"
import { Root } from "src/components/pages/Root"
import { Settings } from "src/components/pages/Settings"
import { RoutePath } from "src/constants/RoutePaths"

type OwnProps = {
  children?: never
}

export const Routes: React.FC<OwnProps> = () => {
  return (
    <Switch>
      <Route exact path={RoutePath.Root} component={Root} />
      <Route exact path={RoutePath.Settings} component={Settings} />

      {/* No route */}
      <Route component={NotFound} />
    </Switch>
  )
}
