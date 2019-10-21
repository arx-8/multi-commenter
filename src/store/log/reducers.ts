import produce from "immer"
import { Action, Reducer } from "redux"
import { LogData } from "src/domain/models/Log"
import { isType } from "typescript-fsa"
import * as actions from "./actions"

export type State = Readonly<{
  logs: LogData[]
}>

export const initialState: State = {
  logs: [],
}

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  if (isType(action, actions.addLog)) {
    return produce(state, (draft) => {
      // 日時でソートしなくてもいいように FILO 的なデータ構造にする
      draft.logs = [action.payload, ...state.logs]
    })
  }

  return state
}
