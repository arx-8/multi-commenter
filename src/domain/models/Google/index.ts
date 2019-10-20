import { Brand } from "src/types/Utils"
import { parse } from "querystring"

export type GoogleApiApiKey = Brand<string, "GoogleApiApiKey">
export type GoogleApiClientId = Brand<string, "GoogleApiClientId">

/**
 * 公開 URL の ?v= の値
 */
export type YouTubeVideoId = Brand<string, "YouTubeVideoId">

/**
 * この ID がチャット投稿先
 */
export type YouTubeActiveLiveChatId = Brand<string, "YouTubeActiveLiveChatId">

const QUERY_STRING_EXTRACTOR = /.+\?/

export const extractVideoIdByURL = (url: string): YouTubeVideoId => {
  // ?より手前を取り払わないと正しく動作しないため
  const params = parse(url.replace(QUERY_STRING_EXTRACTOR, ""))
  return params["v"] as YouTubeVideoId
}

/**
 * 有効な YouTube Live のデータ
 */
export type YouTubeActiveLive = {
  activeLiveChatId: YouTubeActiveLiveChatId
  thumbnailUrl: string
}

/**
 * サムネの綺麗な順
 */
const sizeList = ["maxres", "high", "medium", "standard", "default"] as const

export const extractYouTubeActiveLive = (
  data: gapi.client.youtube.Video
): YouTubeActiveLive | undefined => {
  // thumbnail
  if (!data.snippet || !data.snippet.thumbnails) {
    return undefined
  }
  const thumbnails = data.snippet.thumbnails
  const maxSize = sizeList.find((s) => thumbnails[s])!
  const thumbnailUrl = thumbnails[maxSize]!.url!

  // activeLiveChatId
  if (
    !data.liveStreamingDetails ||
    !data.liveStreamingDetails.activeLiveChatId
  ) {
    return undefined
  }
  const activeLiveChatId = data.liveStreamingDetails
    .activeLiveChatId as YouTubeActiveLiveChatId

  return {
    activeLiveChatId,
    thumbnailUrl,
  }
}
