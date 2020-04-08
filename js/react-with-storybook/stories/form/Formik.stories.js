import React from 'react'
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
import { Formik, Form } from 'formik'

export default {
  title: 'form/Formik',
  decorators: [withKnobs],
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
      }}>
      {({ values }) => {
        return (
          <Form>
            <FormikStargazer
              name="score"
              value={values.score}></FormikStargazer>
          </Form>
        )
      }}
    </Formik>
  )
}
