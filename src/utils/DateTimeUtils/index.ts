import dayjs from "dayjs"
import { Brand } from "src/types/Utils"

export type UnixTime = Brand<number, "UnixTime">
export type DateTimeStr = Brand<string, "DateTimeStr">

export const getNow = (): UnixTime => {
  // eslint-disable-next-line no-restricted-globals
  return (new Date().getTime() / 1000) as UnixTime
}

const FORMAT = "YYYY-MM-DD HH:mm:ss.SSS"

export const toDateTimeStr = (unixTime: UnixTime): DateTimeStr => {
  return dayjs(unixTime * 1000).format(FORMAT) as DateTimeStr
}
