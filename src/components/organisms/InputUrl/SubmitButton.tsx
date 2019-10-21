/** @jsx jsx */
import { jsx } from "@emotion/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import { useFormikContext } from "formik"
import React from "react"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"

type OwnProps = {
  children?: never
  disabled: boolean
}

export const SubmitButton: React.FC<OwnProps> = ({ disabled }) => {
  const { handleSubmit, isSubmitting } = useFormikContext()

  return (
    <IconButtonWithTooltip
      onClick={() => {
        handleSubmit()
      }}
      disabled={disabled || isSubmitting}
      tooltipMessage="Connect!"
    >
      <ArrowRightAltIcon />
    </IconButtonWithTooltip>
  )
}
