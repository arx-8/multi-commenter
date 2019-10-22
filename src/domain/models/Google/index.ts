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
  // ?より手前を取り除かないと正しく動作しないため
  const params = parse(url.replace(QUERY_STRING_EXTRACTOR, ""))
  return params["v"] as YouTubeVideoId
}

/**
 * 有効な YouTube Live 動画のデータ
 */
export type YouTubeActiveLiveVideo = {
  activeLiveChatId: YouTubeActiveLiveChatId
  description: string
  thumbnailUrl: string
  title: string
}

/**
 * Live じゃない、ただの YouTube 動画のデータ
 */
export type YouTubeVideo = {
  description: string
  thumbnailUrl: string
  title: string
}

/**
 * サムネの綺麗な順
 */
const sizeList = ["maxres", "high", "medium", "standard", "default"] as const

export const extractYouTubeActiveLive = (
  response: gapi.client.youtube.VideoListResponse
): YouTubeActiveLiveVideo | YouTubeVideo | undefined => {
  // 必ず 1 件の動画を読み込んでいるため、決め打ち
  if (!response.items || response.items.length === 0) {
    return undefined
  }
  const data = response.items[0]

  // activeLiveChatId
  let activeLiveChatId
  if (data.liveStreamingDetails && data.liveStreamingDetails.activeLiveChatId) {
    activeLiveChatId = data.liveStreamingDetails
      .activeLiveChatId as YouTubeActiveLiveChatId
  }

  // thumbnail
  if (!data.snippet || !data.snippet.thumbnails) {
    return undefined
  }
  const thumbnails = data.snippet.thumbnails
  const maxSize = sizeList.find((s) => thumbnails[s])!
  const thumbnailUrl = thumbnails[maxSize]!.url!

  if (activeLiveChatId) {
    return {
      activeLiveChatId,
      thumbnailUrl,
      // thumb があればあるだろうから!
      description: data.snippet.description!,
      title: data.snippet.title!,
    }
  } else {
    return {
      thumbnailUrl,
      description: data.snippet.description!,
      title: data.snippet.title!,
    }
  }
}
