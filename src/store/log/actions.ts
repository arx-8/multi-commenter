import { APP_NAME } from "src/constants/App"
import { LogRecord } from "src/domain/models/Log"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  ADD_LOG: "log/ADD_LOG",
} as const

const create = actionCreatorFactory(APP_NAME)

export const addLog = create<LogRecord>(ActionTypes.ADD_LOG)
