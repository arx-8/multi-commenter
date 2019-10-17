/** @jsx jsx */
import { jsx } from "@emotion/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import { useFormikContext } from "formik"
import React from "react"
import { IconButtonWithTooltip } from "src/components/molecules/IconButtonWithTooltip"

type OwnProps = {
  children?: never
}

export const SubmitButton: React.FC<OwnProps> = () => {
  const { handleSubmit, isSubmitting } = useFormikContext()

  return (
    <IconButtonWithTooltip
      onClick={() => {
        handleSubmit()
      }}
      disabled={isSubmitting}
      tooltipMessage="Connect!"
    >
      <ArrowRightAltIcon />
    </IconButtonWithTooltip>
  )
}
