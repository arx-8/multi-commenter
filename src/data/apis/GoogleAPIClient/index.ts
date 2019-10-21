import {
  FetchVideoDataRequestParams,
  PostLiveChatMessageRequestParams,
} from "src/data/apis/GoogleAPIClient/types"
import { YouTubeActiveLiveChatId } from "src/domain/models/Google"
import { CastAny } from "src/types/Utils"

/**
 * なんか型定義がおかしい
 * youtube 関連のメソッド定義されている位置がずれてる
 */
const getYouTubeAPIClient = (): typeof gapi.client => {
  return (gapi.client as CastAny).youtube
}

export const fetchVideoData = async (
  params: FetchVideoDataRequestParams
): Promise<gapi.client.youtube.VideoListResponse> => {
  // Google認証前にここに到達するとエラー
  // 設計が悪い
  const resp = await getYouTubeAPIClient().videos.list({
    part: "snippet,contentDetails,statistics,liveStreamingDetails",
    id: params.videoId,
  })
  return resp.result
}

/**
 * 型定義が合ってないため、別途定義
 * @see https://developers.google.com/youtube/v3/live/docs/liveChatMessages/insert?apix=true&apix_params=%7B%22part%22%3A%22snippet%22%2C%22resource%22%3A%7B%22snippet%22%3A%7B%22liveChatId%22%3A%22Cg0KCzhXOFZhaTNPY25ZKicKGFVDT2VmSU5hMl9CbXB1WDRCYkhqZGs5QRILOFc4VmFpM09jblk%22%2C%22type%22%3A%22textMessageEvent%22%2C%22textMessageDetails%22%3A%7B%22messageText%22%3A%22%E3%81%AA%E3%81%A4%E3%81%8B%E3%81%97%E3%81%84%E3%81%AD%E3%81%88%5Cn%22%7D%7D%7D%7D
 */
type LiveChatMessagesInsertRequest = {
  part: "snippet"
  resource: {
    snippet: {
      liveChatId: YouTubeActiveLiveChatId
      type: "textMessageEvent"
      textMessageDetails: {
        messageText: string
      }
    }
  }
}

export const postLiveChatMessage = async (
  params: PostLiveChatMessageRequestParams
): Promise<gapi.client.youtube.LiveChatMessage> => {
  const request: LiveChatMessagesInsertRequest = {
    part: "snippet",
    resource: {
      snippet: {
        liveChatId: params.liveChatId,
        type: "textMessageEvent",
        textMessageDetails: {
          messageText: params.messageText,
        },
      },
    },
  }

  const resp = await getYouTubeAPIClient().liveChatMessages.insert(request)
  return resp.result
}
