import { FetchVideoDataRequestParams } from "src/data/apis/GoogleAPIClient/types"
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
