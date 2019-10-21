import { APP_NAME } from "src/constants/App"
import { SerializableError } from "src/domain/errors/SerializableError"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  POST: "post/POST",
} as const

const create = actionCreatorFactory(APP_NAME)

export const post = create.async<void, void, SerializableError>(
  ActionTypes.POST
)
