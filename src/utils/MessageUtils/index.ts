import { TweetText } from "src/domain/models/Twitter"
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

type RemainingStatus = "ok" | "warn" | "error"

/**
 * 残り文字数の状況をチェックして返す
 */
export const checkRemainingStatus = (remainingNum: number): RemainingStatus => {
  if (remainingNum < 0) {
    return "error"
  }

  if (remainingNum < MAX_LENGTH / 2) {
    return "warn"
  }

  return "ok"
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

const FINAL_NEW_LINE = /\n$/

export const concatAsTweet = (main: string, suffix: string): TweetText => {
  // suffix がなければ、空白は不要
  // suffix 側は改行を入力させないため trim できるが、main 側は改行があるから trim できない
  if (suffix.trim().length === 0) {
    return main as TweetText
  }

  // 本文に末尾改行があれば、空ける必要はない
  if (FINAL_NEW_LINE.test(main)) {
    return `${main}${suffix}` as TweetText
  }

  // ハッシュタグなどを分離するため、半角スペースを挟む
  return `${main} ${suffix}` as TweetText
}
