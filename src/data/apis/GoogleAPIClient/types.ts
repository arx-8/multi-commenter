import {
  YouTubeActiveLiveChatId,
  YouTubeVideoId,
} from "src/domain/models/Google"

export type FetchVideoDataRequestParams = {
  videoId: YouTubeVideoId
}

export type PostLiveChatMessageRequestParams = {
  liveChatId: YouTubeActiveLiveChatId
  messageText: string
}
