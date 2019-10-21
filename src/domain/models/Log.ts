import { DateTimeStr } from "src/utils/DateTimeUtils"

export type LogData = {
  actionDateTime: DateTimeStr
  action: string
  detail: string
}
