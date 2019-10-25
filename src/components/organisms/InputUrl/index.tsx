/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { createStyles, makeStyles, Paper } from "@material-ui/core"
import { Form, Formik } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { InnerInput } from "src/components/organisms/InputUrl/InnerInput"
import { SubmitButton } from "src/components/organisms/InputUrl/SubmitButton"
import { authSelectors } from "src/store/auth"
import * as Yup from "yup"

type OwnProps = {
  children?: never
  onSubmit: (value: string) => void
}

type FormValues = {
  url: string
}

const initialValues: FormValues = {
  url: "",
}

const validationSchema = Yup.object().shape<FormValues>({
  url: Yup.string()
    .required("YouTube LiveのURLを入力してください")
    .matches(
      /^https:\/\/www\.youtube\.com\/watch.+/,
      "YouTube LiveのURLを入力してください"
    ),
})

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      marginTop: "4px",
      marginBottom: "4px",
      paddingLeft: "4px",
    },
    inputRoot: {
      flexGrow: 1,
    },
  })
)

export const InputUrl: React.FC<OwnProps> = ({ onSubmit }) => {
  const classes = useStyles()
  const isAllAuthorized = useSelector(authSelectors.isAllAuthorized)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values.url)
      }}
      validateOnChange
    >
      <Form css={root}>
        <Paper className={classes.root} css={!isAllAuthorized && disabledInput}>
          <InnerInput
            disabled={!isAllAuthorized}
            name="url"
            placeholder="YouTube Live URL (e.g. https://www.youtube.com/watch?v=xxx)"
            inputProps={{ "aria-label": "Open URL" }}
            classes={{
              root: classes.inputRoot,
            }}
          />
          <span css={!isAllAuthorized && disabledInput}>
            <SubmitButton disabled={!isAllAuthorized} />
          </span>
        </Paper>
      </Form>
    </Formik>
  )
}

const root = css`
  flex-grow: 1;
`

const disabledInput = css`
  background-color: lightgray !important;
`
