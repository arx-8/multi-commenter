/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React from "react"

type OwnProps = {
  children?: never
}

export const Root: React.FC<OwnProps> = () => {
  return (
    <div css={root}>
      <header css={header}>
        <p>Hello React</p>
        <a
          css={link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

const root = css`
  text-align: center;
`

const header = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const link = css`
  color: #61dafb;
`
