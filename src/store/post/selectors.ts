import { RootState } from "src/store/store"
import {
  checkIsPostable,
  concatAsTweet,
  countRemaining,
} from "src/utils/MessageUtils"

/**
 * 投稿中？
 */
export const isPosting = (rootState: RootState): boolean => {
  const s = rootState.post
  return s.ui.postTweet.isLoading || s.ui.postYouTubeLiveChat.isLoading
}

export const getInputMessageStatus = (
  rootState: RootState
): {
  /** 投稿可能か？ */
  isPostable: boolean
  /**
   * 入力可能な残り文字数
   * この処理内で計算した値を返し再利用することで、計算量を減らす
   */
  remainingNum: number
} => {
  const { mainMessage, tweetSuffix } = rootState.post

  const remainingNum = countRemaining(concatAsTweet(mainMessage, tweetSuffix))
  const isPostable = checkIsPostable(mainMessage, tweetSuffix, remainingNum)

  return { isPostable, remainingNum }
}
