import React from "react"
import ReactDOM from "react-dom"
import { Provider as ReduxProvider } from "react-redux"
import { Routes } from "src/components/helpers/Routes"
import { Initializer } from "src/components/pages/Initializer"
import { GlobalStyles } from "src/components/styles/GlobalStyles"
import { unregister } from "src/serviceWorker"
import { configureStore } from "src/store/store"

const reduxStore = configureStore(window.__REDUX_INITIAL_STATE__)

const App: React.FC = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <GlobalStyles />
      <Initializer>
        <Routes />
      </Initializer>
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister()
