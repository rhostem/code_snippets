import React, { useState, useEffect, useMemo } from 'react'
import { Form, Field } from 'react-final-form'
import {
  composeValidators,
  notEmptyString,
  required,
} from 'lib/finalFormValidators'

function FinalFormExample({ updatedInitialValues }) {
  // final form field names
  const fields = useMemo(
    () => ({
      address: 'address',
    }),
    []
  )

  // 폼 기본값
  const defaultValues = useMemo(
    () => ({
      address: '',
    }),
    []
  )

  const [initialValues, setInitialValues] = useState(defaultValues)

  // 초기값 반영
  useEffect(() => {
    setInitialValues(Object.assign({}, defaultValues, updatedInitialValues))
  }, [defaultValues, updatedInitialValues])

  /**
   * final form onsubmit
   * 주문 배송지 업데이트
   */
  const handleSubmit = values => {
    console.log(`values`, values)
  }

  return useObserver(() => (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form: formApi }) => {
        const { values } = formApi.getState()
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name={fields.address}
              validate={composeValidators(required, notEmptyString)}>
              {props => (
                <div>
                  {/* input */}
                  <input type="text" onChange={props.input.onChange} />

                  {/* error message */}
                  {props.meta.submitFailed && <div>{props.meta.error}</div>}
                </div>
              )}
            </Field>
          </form>
        )
      }}
    />
  ))
}

export default FinalFormExample
