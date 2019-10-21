import { APP_NAME } from "src/constants/App"
import { SerializableError } from "src/domain/errors/SerializableError"
import actionCreatorFactory from "typescript-fsa"

export const ActionTypes = {
  POST_TWEET: "post/POST_TWEET",
  POST_YOU_TUBE_LIVE_CHAT: "post/POST_YOU_TUBE_LIVE_CHAT",
} as const

const create = actionCreatorFactory(APP_NAME)

export const postTweet = create.async<void, void, SerializableError>(
  ActionTypes.POST_TWEET
)

export const postYouTubeLiveChat = create.async<void, void, SerializableError>(
  ActionTypes.POST_YOU_TUBE_LIVE_CHAT
)
