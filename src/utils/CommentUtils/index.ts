import twitter from "twitter-text"

/**
 * 絵文字が Twitter と YouTube でカウントが異なる。
 * そのため、両方に投稿できる最大値にしている。
 */
const MAX_LENGTH = 200

const URL_PREFIX = /https?:\/\//

export const getLength = (text: string): number => {
  return twitter.getTweetLength(text)
}

export const countRemaining = (text: string): number => {
  return MAX_LENGTH - getLength(text)
}

export const isValidComment = (text: string): boolean => {
  // 空 NG
  if (text.length === 0) {
    return false
  }

  // URL NG
  if (URL_PREFIX.test(text)) {
    return false
  }

  return 0 < countRemaining(text)
}
