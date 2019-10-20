/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { CircularProgress } from "@material-ui/core"
import React, { Fragment, useState, useEffect } from "react"
import { authOperations } from "src/store/auth"

type OwnProps = {
  // NOP
}

export const Initializer: React.FC<OwnProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    ;(async () => {
      await authOperations.initGoogleAuthClient()
      setInitializing(false)
    })()
  })

  if (initializing) {
    return (
      <div css={loading}>
        <CircularProgress />
      </div>
    )
  }

  return <Fragment>{children}</Fragment>
}

const loading = css`
  text-align: center;
`
