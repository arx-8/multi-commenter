import { Routes } from "components/helpers/Routes"
import { GlobalStyles } from "components/styles/GlobalStyles"
import React from "react"
import ReactDOM from "react-dom"
import { Provider as ReduxProvider } from "react-redux"
import { HashRouter as Router } from "react-router-dom"
import { unregister } from "serviceWorker"
import { configureStore } from "store/store"

const reduxStore = configureStore(window.__REDUX_INITIAL_STATE__)

const App: React.FC = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <Router>
        <GlobalStyles />
        <Routes />
      </Router>
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister()
