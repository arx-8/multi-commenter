// import produce from "immer"
import { Reducer } from "redux"
// import * as actions from "./actions"
// import { ActionTypes } from "./actions"

export type State = Readonly<{}>

export const initialState: State = {}

type Action = ReturnType<any>

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // case ActionTypes.ADD_TODO_STARTED:
    //   return produce(state, (draft) => {
    //     draft.isLoading.add = true
    //   })

    default: {
      // case の定義忘れ防止のため
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const _: never = action
      return state
    }
  }
}
