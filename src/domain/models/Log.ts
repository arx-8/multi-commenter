import { DateTimeStr } from "src/utils/DateTimeUtils"

export type LogRecord = {
  actionDateTime: DateTimeStr
  action: string
  detail: string
  noticeStatus: NoticeStatus
}

export type NoticeStatus = "ok" | "warn" | "error"
