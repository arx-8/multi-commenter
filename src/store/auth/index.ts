import * as operations from "./operations"
import { reducer, State } from "./reducers"
import * as selectors from "./selectors"

export const authOperations = operations
export const authReducer = reducer
export const authSelectors = selectors
export type AuthState = State
