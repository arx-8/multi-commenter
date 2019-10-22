import { authSelectors } from "src/store/auth"
import { postSelectors } from "src/store/post"
import { settingsSelectors } from "src/store/settings"
import { RootState } from "src/store/store"

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

  // 投稿中？
  if (postSelectors.isPosting(rootState)) {
    return false
  }

  // 投稿できる動画か？
  if (
    !rootState.settings.youTubeData ||
    !("activeLiveChatId" in rootState.settings.youTubeData)
  ) {
    return false
  }

  return true
}
