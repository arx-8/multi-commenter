/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Badge, IconButton, Tooltip } from "@material-ui/core"
import React, { ReactNode } from "react"

type OwnProps = {
  /** アイコン */
  children: ReactNode
  disabled?: boolean
  onClick: () => void
  showBadge?: boolean
  tooltipMessage: string
}

export const IconButtonWithTooltip: React.FC<OwnProps> = ({
  children,
  disabled,
  onClick,
  showBadge,
  tooltipMessage,
}) => {
  return (
    <Tooltip title={<span css={tooltipTitle}>{tooltipMessage}</span>}>
      <Badge
        badgeContent=" "
        color="secondary"
        invisible={!showBadge}
        overlap="circle"
        variant="dot"
      >
        <IconButton css={btn} disabled={disabled} onClick={onClick}>
          {children}
        </IconButton>
      </Badge>
    </Tooltip>
  )
}

const tooltipTitle = css`
  font-size: large;
`

const btn = css`
  padding: 8px;
`
