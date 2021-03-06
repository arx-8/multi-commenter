/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import { useSelector } from "react-redux"
import ReactTable, { Column } from "react-table"
import "react-table/react-table.css"
import { CellOfAction } from "src/components/organisms/LogView/CellOfAction"
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
        defaultPageSize={10}
      />
    </div>
  )
}

const columnsDef: Column<LogRecord>[] = [
  {
    Header:
      "ログ（「列名」をクリックで並替え。Shiftキー同時押しで複数列並替え。）",
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
        width: 220,
        Cell: CellOfAction,
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

  .rt-td {
    white-space: unset !important;
  }
`
