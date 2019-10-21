import { RootState } from "src/store/store"
import { authSelectors } from "src/store/auth"
import { settingsSelectors } from "src/store/settings"

/**
 * 投稿のための下準備(=認証など。メッセージ入力は除く。)ができてる状態か？
 */
export const isReadyToPost = (rootState: RootState): boolean => {
  // 未認証
  if (!authSelectors.isAllAuthorized(rootState)) {
    return false
  }

  // YouTube Live Channel URL 未設定
  if (!settingsSelectors.isLoadedYouTubeData(rootState)) {
    return false
  }

  // 投稿中
  const s = rootState.post
  if (s.ui.postTweet.isLoading || s.ui.postYouTubeLiveChat.isLoading) {
    return false
  }

  return true
}
