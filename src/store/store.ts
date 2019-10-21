import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from "connected-react-router"
import { createBrowserHistory } from "history"
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  DeepPartial,
  Store,
} from "redux"
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant"
import persistState from "redux-localstorage"
import { createSerializableStateInvariantMiddleware } from "redux-starter-kit"
import thunkMiddleWare from "redux-thunk"
import { isDevelopment } from "src/constants/Env"
import { authReducer, AuthState } from "src/store/auth"
import { logReducer, LogState } from "src/store/log"
import { postReducer, PostState } from "src/store/post"
import { settingsReducer, SettingsState } from "src/store/settings"

export const history = createBrowserHistory()

export type RootState = Readonly<{
  auth: AuthState
  log: LogState
  post: PostState
  router: RouterState
  settings: SettingsState
}>

export const configureStore = (
  initialState: DeepPartial<RootState> = {}
): Store<RootState, AnyAction> => {
  const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    log: logReducer,
    post: postReducer,
    router: connectRouter(history),
    settings: settingsReducer,
  })

  // Connect Chrome Redux DevTools, if installed.
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleWares = []
  middleWares.push(thunkMiddleWare)
  middleWares.push(routerMiddleware(history))
  if (isDevelopment) {
    middleWares.push(immutableStateInvariantMiddleware())
    middleWares.push(createSerializableStateInvariantMiddleware())
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWares), persistState(["auth"]))
  )
  return store
}
