// import React, { Fragment } from 'react'
import styled from 'styled-components'
import { clearFix } from 'polished'

export const FormContainer = styled.div`
  margin: 12px 0;
  /* FormGroup */
  & > * {
    &:last-child {
      border-bottom: 1px solid #dee0e4;
    }
  }
`
export const FormGroup = styled.div`
  ${clearFix()};
  display: flex;
  font-size: 14px;
  border-top: 1px solid #dee0e4;
`

/**
 * label, input의 wrapper
 * FormGroup을 같은 넓이로 나눈다. FormGroup에 한 세트의 label, input만 사용된다면 필요없다.
 */
export const FormContent = styled.div`
  ${clearFix()};
  flex: 1;
`

const labelWidth = '135px'
export const FormLabel = styled.label`
  float: left;
  padding: 12px 10px;
  width: ${labelWidth};
  margin-bottom: 0;
`

/**
 * input, form, select, texteditor, ...
 */
export const FormInput = styled.div`
  padding: 12px 10px;
  float: left;
  width: calc(100% - ${labelWidth});
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;
`
