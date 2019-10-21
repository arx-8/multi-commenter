import { APP_NAME } from "src/constants/App"
import { LogData } from "src/domain/models/Log"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  ADD_LOG: "log/ADD_LOG",
} as const

const create = actionCreatorFactory(APP_NAME)

export const addLog = create<LogData>(ActionTypes.ADD_LOG)
