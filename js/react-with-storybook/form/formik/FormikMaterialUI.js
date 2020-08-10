import React from 'react'
import { useField } from 'formik'
import { TextField, Select } from '@material-ui/core'

export const FormikMuiTextField = ({ error, ...props }) => {
  const [field] = useField(props)
  return (
    <TextField
      {...props}
      value={field.value}
      onChange={field.onChange}
      error={!!error}
      helperText={error}
    ></TextField>
  )
}

export const FormikMuiSelect = ({ label, error, children, ...props }) => {
  const [field] = useField(props)
  return (
    <Select {...props} value={field.value} onChange={field.onChange}>
      {children}
    </Select>
  )
}
