/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { Fragment } from "react"
import { CellInfo } from "react-table"
import { NoticeStatusIcon } from "src/components/organisms/LogView/NoticeStatusIcon"
import { errorColor, warnColor } from "src/components/styles/styles"
import { LogRecord } from "src/domain/models/Log"

/**
 * 利用する側が特殊なため、他と違う定義方法にしている
 */
type OwnProps = CellInfo

export const CellOfAction: React.FC<OwnProps> = (cellInfo) => {
  const o: LogRecord = cellInfo.original

  return (
    <Fragment>
      <NoticeStatusIcon status={o.noticeStatus} />
      <span css={[text, dotCssMap[o.noticeStatus]]}>{o.action}</span>
    </Fragment>
  )
}

const text = css`
  padding-left: 4px;
`

const ok = css``

const warn = css`
  color: ${warnColor};
`

const error = css`
  color: ${errorColor};
  font-weight: bolder;
`

// 簡易 pattern match 用
const dotCssMap = {
  ok,
  warn,
  error,
}
