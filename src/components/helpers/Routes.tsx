import { ConnectedRouter as Router } from "connected-react-router"
import React from "react"
import { Route, Switch } from "react-router-dom"
import { NotFound } from "src/components/pages/NotFound"
import { Root } from "src/components/pages/Root"
import { Settings } from "src/components/pages/Settings"
import { TwitterAuthCallback } from "src/components/pages/TwitterAuthCallback"
import { RoutePath } from "src/constants/RoutePaths"
import { history } from "src/store/store"

type OwnProps = {
  children?: never
}

export const Routes: React.FC<OwnProps> = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={RoutePath.Root} component={Root} />
        <Route exact path={RoutePath.Settings} component={Settings} />
        <Route
          exact
          path={RoutePath.TwitterAuthCallback}
          component={TwitterAuthCallback}
        />

        {/* No route */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
