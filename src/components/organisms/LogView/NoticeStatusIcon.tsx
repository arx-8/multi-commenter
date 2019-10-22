/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { errorColor, warnColor } from "src/components/styles/styles"
import { NoticeStatus } from "src/domain/models/Log"

type OwnProps = {
  children?: never
  status: NoticeStatus
}

export const NoticeStatusIcon: React.FC<OwnProps> = ({ status }) => {
  return <span css={dotCssMap[status]}>&#x25cf;</span>
}

const ok = css`
  transition: all 0.3s ease;
  color: #57d500;
`

const warn = css`
  transition: all 0.3s ease;
  color: ${warnColor};
`

const error = css`
  transition: all 0.3s ease;
  color: ${errorColor};
`

// 簡易 pattern match 用
const dotCssMap = {
  ok,
  warn,
  error,
}
