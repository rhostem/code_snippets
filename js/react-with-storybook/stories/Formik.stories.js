import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import { Formik, Form } from 'formik'
import FormikRadio from '../form/formik/FormikRadio'
import FormikStargazer from '../form/formik/FormikStargazer'

const stories = storiesOf('Formik', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.add('FormikRadio', () => {
  return <FormikRadio />
})

stories.add('FormikStargazer', () => {
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
})
