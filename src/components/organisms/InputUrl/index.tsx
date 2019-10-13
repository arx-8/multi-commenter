/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { Form, Formik } from "formik"
import React from "react"
import { InnerInput } from "src/components/organisms/InputUrl/InnerInput"
import { SubmitButton } from "src/components/organisms/InputUrl/SubmitButton"
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
    .url("正しいURLを入力してください")
    .required("YouTube LiveのURLを入力してください"),
})

export const InputUrl: React.FC<OwnProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values.url)
      }}
      validateOnChange
    >
      <Form>
        <div css={root}>
          <div>
            <InnerInput
              name="url"
              placeholder="https://www.youtube.com/watch?v=xxx"
              size={40}
            />
          </div>
          <SubmitButton />
        </div>
      </Form>
    </Formik>
  )
}

const root = css`
  display: flex;
`
