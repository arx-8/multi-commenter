import * as operations from "./operations"
import { reducer, State } from "./reducers"
import * as selectors from "./selectors"

/**
 * 投稿のための設定関連
 */

export const settingsOperations = operations
export const settingsReducer = reducer
export const settingsSelectors = selectors
export type SettingsState = State
