/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { InputBase } from "@material-ui/core"
import { InputBaseProps } from "@material-ui/core/InputBase"
import { useField } from "formik"
import React, { Fragment } from "react"

type OwnProps = {
  children?: never
  name: string
}

type Props = OwnProps & InputBaseProps

export const InnerInput: React.FC<Props> = ({ name, ...inputBaseProps }) => {
  const [field, meta] = useField(name)

  return (
    <Fragment>
      <InputBase {...inputBaseProps} {...field} />
      {meta.error && meta.touched && <div css={error}>{meta.error}</div>}
    </Fragment>
  )
}

const error = css`
  color: crimson;

  /* flexとの兼ね合いでうまく位置が取れてないため、一旦 absolute */
  position: absolute;
  bottom: 4px;
`
