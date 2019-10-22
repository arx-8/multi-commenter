import { APP_NAME } from "src/constants/App"
import { SerializableError } from "src/domain/errors/SerializableError"
import { YouTubeActiveLiveVideo, YouTubeVideo } from "src/domain/models/Google"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  FETCH_YOU_TUBE_ACTIVE_LIVE: "settings/FETCH_YOU_TUBE_ACTIVE_LIVE",
  SET_YOU_TUBE_URL: "settings/SET_YOU_TUBE_URL",
} as const

const create = actionCreatorFactory(APP_NAME)

export const fetchYouTubeActiveLive = create.async<
  void,
  YouTubeActiveLiveVideo | YouTubeVideo | undefined,
  SerializableError
>(ActionTypes.FETCH_YOU_TUBE_ACTIVE_LIVE)

export const setYouTubeUrl = create<{ url: string }>(
  ActionTypes.SET_YOU_TUBE_URL
)
