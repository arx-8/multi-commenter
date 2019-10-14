/** @jsx jsx */
import { jsx } from "@emotion/core"
import Button from "@material-ui/core/Button"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import { useFormikContext } from "formik"
import React from "react"

type OwnProps = {
  children?: never
}

export const SubmitButton: React.FC<OwnProps> = () => {
  const { handleSubmit } = useFormikContext()

  return (
    <Button
      variant="contained"
      onClick={() => {
        handleSubmit()
      }}
    >
      <ArrowRightAltIcon />
    </Button>
  )
}
