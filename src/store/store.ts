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

export const history = createBrowserHistory()

export type RootState = Readonly<{
  auth: AuthState
  router: RouterState
}>

export const configureStore = (
  initialState: DeepPartial<RootState> = {}
): Store<RootState, AnyAction> => {
  const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    router: connectRouter(history),
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
