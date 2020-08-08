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
import {
  InputLabel,
  Box,
  MenuItem,
  makeStyles,
  createStyles,
  TextField,
  Select,
  FormControl,
  FormHelperText,
} from '@material-ui/core'
import { Button, LinearProgress } from '@material-ui/core'
import { Formik, Form } from 'formik'
import withMuiTheme from '../decorator/withMuiTheme'
import {
  FormikMuiTextField,
  FormikMuiSelect,
} from '../../form/formik/FormikMui'

export default {
  title: 'MaterialUI/form',
  decorators: [withKnobs, withMuiTheme],
}

/**
 * Formik Material-UI Lib
 * https://stackworx.github.io/formik-material-ui/docs/guide/getting-started
 */
export const InputValidation = () => {
  return (
    <Formik
      initialValues={{
        email: 'text@',
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
        console.log(`values`, values)

        return (
          <Form>
            <Box mt={2} mb={2} display={'flex'}>
              <FormikMuiTextField
                type="email"
                name="email"
                label="email"
                variant="outlined"
                error={errors.email}
              />
              <FormikMuiTextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                error={errors.password}
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

export const SimpleSelect = () => {
  const classes = useStyles()
  return (
    <Formik
      initialValues={{
        age: 10,
        name: '',
      }}
      validate={values => {
        const errors = {}
        if (values.age === 30) {
          errors.age = 'age should not be 30'
        }
        return errors
      }}
    >
      {({ submitForm, isSubmitting, errors, values }) => {
        console.log(`values`, values)

        return (
          <Box m={4}>
            <FormControl style={{ width: '200px' }} error={errors.age}>
              <FormikMuiSelect name="age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </FormikMuiSelect>
              {errors.age && <FormHelperText>{errors.age}</FormHelperText>}
            </FormControl>
            <FormControl style={{ width: '200px' }} error={errors.age}>
              <FormikMuiTextField
                name="name"
                placeholder="name"
              ></FormikMuiTextField>
            </FormControl>
          </Box>
        )
      }}
    </Formik>
  )
}
