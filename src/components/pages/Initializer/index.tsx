/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { CircularProgress } from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { authOperations } from "src/store/auth"

type OwnProps = {
  // NOP
}

export const Initializer: React.FC<OwnProps> = ({ children }) => {
  const dispatch = useDispatch()
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    ;(async () => {
      await dispatch(authOperations.initAndCheck())
      setInitializing(false)
    })()
  }, [dispatch])

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
