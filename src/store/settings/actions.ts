import { APP_NAME } from "src/constants/App"
import { SerializableError } from "src/domain/errors/SerializableError"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  LOAD_VIDEO: "settings/LOAD_VIDEO",
} as const

const create = actionCreatorFactory(APP_NAME)

export const loadVideo = create.async<void, void, SerializableError>(
  ActionTypes.LOAD_VIDEO
)
