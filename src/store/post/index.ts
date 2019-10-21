import * as operations from "./operations"
import { reducer, State } from "./reducers"
import * as selectors from "./selectors"

/**
 * 投稿関連
 */

export const postOperations = operations
export const postReducer = reducer
export const postSelectors = selectors
export type PostState = State
