import { RootState } from "src/store/store"

/**
 * 投稿中？
 */
export const isPosting = (rootState: RootState): boolean => {
  const s = rootState.post
  return s.ui.postTweet.isLoading || s.ui.postYouTubeLiveChat.isLoading
}
