/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { useSelector } from "react-redux"
import ReactTable, { Column } from "react-table"
import "react-table/react-table.css"
import { LogRecord } from "src/domain/models/Log"
import { RootState } from "src/store/store"

type OwnProps = {
  children?: never
}

export const LogView: React.FC<OwnProps> = () => {
  const logs = useSelector((state: RootState) => state.log.logs)

  return (
    <div css={root}>
      <ReactTable<LogRecord>
        columns={columnsDef}
        data={logs}
        defaultPageSize={5}
      />
    </div>
  )
}

const columnsDef: Column<LogRecord>[] = [
  {
    Header: "ログ",
    headerClassName: "root-header",
    columns: [
      {
        Header: "日時",
        accessor: "actionDateTime",
        width: 192,
      },
      {
        Header: "操作",
        accessor: "action",
        width: 192,
      },
      {
        Header: "内容",
        accessor: "detail",
      },
    ],
  },
]

const root = css`
  .ReactTable {
    font-size: smaller;
  }

  .root-header {
    text-align: left;
  }
`
