import { LogRecord } from "src/domain/models/Log"
import { AppThunkAction } from "src/types/ReduxTypes"
import { getNow, toDateTimeStr } from "src/utils/DateTimeUtils"
import * as actions from "./actions"

export const addLog = (
  record: Omit<LogRecord, "actionDateTime">
): AppThunkAction<void> => {
  return (dispatch) => {
    dispatch(
      actions.addLog({
        ...record,
        actionDateTime: toDateTimeStr(getNow()),
      })
    )
  }
}
