import * as operations from "./operations"
import { reducer, State } from "./reducers"
import * as selectors from "./selectors"

/**
 * 操作ログ
 */

export const logOperations = operations
export const logReducer = reducer
export const logSelectors = selectors
export type LogState = State
