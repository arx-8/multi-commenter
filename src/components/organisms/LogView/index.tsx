/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"
import ReactTable, { Column } from "react-table"
import "react-table/react-table.css"

type OwnProps = {
  children?: never
}

export const LogView: React.FC<OwnProps> = () => {
  const data = makeData()

  return (
    <div css={root}>
      <ReactTable data={data} defaultPageSize={5} columns={columnsDef} />
    </div>
  )
}

const columnsDef: Column<LogData>[] = [
  {
    Header: "ログ",
    headerClassName: "root-header",
    columns: [
      {
        Header: "操作日時",
        accessor: "actionDateTime",
        className: "td-actionDateTime",
      },
      {
        Header: "操作",
        accessor: "action",
        className: "td-action",
      },
      {
        Header: "内容",
        accessor: "detail",
        className: "td-detail",
      },
    ],
  },
]

const root = css`
  .root-header {
    text-align: left;
  }
`

const range = (len: number): number[] => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

type LogData = {
  actionDateTime: number
  action: string
  detail: string
}

const newPerson = (): LogData => {
  return {
    actionDateTime: Math.floor(Math.random() * 30),
    action: "lll" + Math.floor(Math.random() * 30),
    detail: "fff" + Math.floor(Math.random() * 30),
  }
}

function makeData(len = 100): LogData[] {
  return range(len).map(() => {
    return newPerson()
  })
}
