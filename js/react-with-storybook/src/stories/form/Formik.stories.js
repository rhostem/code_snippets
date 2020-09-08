import React, { useMemo, useCallback } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import FormikRadio from '../../form/formik/FormikRadio'
import FormikStargazer from '../../form/formik/FormikStargazer'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export default {
  title: 'form/Formik',
  decorators: [withKnobs],
}

export const ValidateSchemeWithYup = () => {
  const scheme = Yup.object().shape({
    name: Yup.string()
      .required('이 값은 필수입니다')
      .min(2, '이름은 두 글자 이상이어야 합니다.'),

    email: Yup.string()
      .required('이 값은 필수입니다')
      .email('이메일 형식이 아닙니다.'),

    phone: Yup.string().matches(/^\d{3}-?\d{3,4}-?\d{4}$/, {
      message: '휴대전화 형식이 아닙니다.',
    }),
  })

  const initialValues = useMemo(
    () => ({
      name: '',
      email: '',
      phone: '',
    }),
    []
  )

  const handleSubmit = useCallback((values, actions) => {
    console.log(`handlesubmit - values`, values)
    actions.setSubmitting(false) //  NOTE: async 콜백에서는 필요없음
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={scheme}
    >
      {({ values, isSubmitting, errors, touched }) => {
        return (
          <Form>
            <div
              css={`
                font-family: sans-serif;
                width: 460px;
                margin: 0 auto;

                .field {
                  label {
                    display: inline-block;
                    width: 80px;
                  }

                  input {
                    width: 200px;
                    display: inline-block;
                    margin-left: 10px;
                    padding: 5px 10px;
                  }

                  &:not(:first-child) {
                    margin-top: 20px;
                  }
                }

                .error {
                  font-weight: bold;
                  color: #ff5256;
                  font-size: 0.8em;
                }

                button[type='submit'] {
                  display: block;
                  width: 100px;
                  margin-top: 20px;
                }
              `}
            >
              <div className="field">
                <label>제목</label>
                <Field name="name" as="input" placeholder="이름"></Field>
                <div className="error">
                  {touched.name && errors.name && <span>{errors.name}</span>}
                </div>
              </div>

              <div className="field">
                <label>이메일</label>
                <Field
                  name="email"
                  as="input"
                  type="email"
                  placeholder="user@gmail.com"
                ></Field>
                <div className="error">
                  {touched.email && errors.email && <span>{errors.email}</span>}
                </div>
              </div>

              <div className="field">
                <label>휴대전화</label>
                <Field
                  name="phone"
                  as="input"
                  type="tel"
                  placeholder="010-0000-0000"
                ></Field>
                <div className="error">
                  {touched.phone && errors.phone && <span>{errors.phone}</span>}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                submit
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export const Radio = () => {
  return <FormikRadio />
}

export const Stargazer = () => {
  return (
    <Formik
      initialValues={{
        score: 3,
      }}
      onSubmit={(values, actions) => {
        console.log(`onSubmit`, values)
        actions.setSubmitting(false)
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <FormikStargazer
              name="score"
              value={values.score}
            ></FormikStargazer>
          </Form>
        )
      }}
    </Formik>
  )
}
