/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useField } from "formik"
import React, { Fragment } from "react"

type OwnProps = {
  children?: never
  name: string
}

type Props = OwnProps & React.InputHTMLAttributes<HTMLInputElement>

export const InnerInput: React.FC<Props> = ({ name, ...rest }) => {
  const [field, meta] = useField(name)

  return (
    <Fragment>
      <input type="text" {...rest} {...field} />
      {meta.error && meta.touched && <div css={error}>{meta.error}</div>}
    </Fragment>
  )
}

const error = css`
  color: crimson;
`
