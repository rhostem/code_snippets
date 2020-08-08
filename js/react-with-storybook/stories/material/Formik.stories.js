import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, FormHelperText, Box } from '@material-ui/core'
import { Button, LinearProgress } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField, Select } from 'formik-material-ui'

export default {
  title: 'MaterialUI/form',
  decorators: [withKnobs],
}

export const InputValidation = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        const errors: Partial<Values> = {}
        if (!values.email) {
          errors.email = 'Email is required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false)
          alert(JSON.stringify(values, null, 2))
        }, 500)
      }}
    >
      {({ submitForm, isSubmitting, errors, values }) => {
        return (
          <Form>
            <Box mb={2} display={'flex'}>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                className={'sample'}
              />
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
                variant="outlined"
              />
            </Box>

            {isSubmitting && <LinearProgress />}

            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}
