import { APP_NAME } from "src/constants/App"
import { SerializableError } from "src/domain/errors/SerializableError"
import { YouTubeActiveLive } from "src/domain/models/Google"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  FETCH_YOU_TUBE_ACTIVE_LIVE: "settings/FETCH_YOU_TUBE_ACTIVE_LIVE",
} as const

const create = actionCreatorFactory(APP_NAME)

export const fetchYouTubeActiveLive = create.async<
  void,
  YouTubeActiveLive | undefined,
  SerializableError
>(ActionTypes.FETCH_YOU_TUBE_ACTIVE_LIVE)
