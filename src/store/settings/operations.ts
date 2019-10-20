import { AppThunkAction } from "src/types/ReduxTypes"

export const loadVideo = (): AppThunkAction => {
  return async (dispatch) => {
    console.log(dispatch)
  }
}
