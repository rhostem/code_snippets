import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Formik, Form, useFormik, useField } from 'formik'

const CustomRadio = styled.div`
  display: flex;
  margin-right: 10px;
  &:not(:first-child) {
    margin-top: 5px;
  }

  input {
    display: none;
  }

  label {
    display: block;
    position: relative;
    min-width: 90px;

    padding-left: 30px;

    &:hover {
      cursor: pointer;
    }

    &::before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #eee;
    }
  }

  input:checked + label {
    &::before {
      content: ' ';
      background: #ec407a;
    }
  }
`

export function RadioField({ id, inputValue, label, name, ...props }) {
  const [field, meta, helpers] = useField(name)
  console.log(`field`, field)
  console.log(`inputValue === field.value`, inputValue === field.value)

  return (
    <CustomRadio>
      <input
        {...field}
        type="radio"
        id={id}
        checked={inputValue === field.value}
        value={inputValue}
      />
      <label htmlFor={id}>{label}</label>
    </CustomRadio>
  )
}

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        score: 'option_1',
      }}
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2))
      }}>
      {({}) => {
        return (
          <div css={{}}>
            <RadioField
              name="score"
              id="option_1"
              inputValue={'option_1'}
              label="option_1"></RadioField>

            <RadioField
              name="score"
              id="option_2"
              inputValue={'option_2'}
              label="option_2"></RadioField>
          </div>
        )
      }}
    </Formik>
  )
}

export default SignupForm
