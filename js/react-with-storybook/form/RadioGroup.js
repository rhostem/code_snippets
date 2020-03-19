import React from 'react'
import styled from 'styled-components'
import { mixin } from 'styles'

const Wrap = styled.div`
  ${mixin.clearFix()};
  font-size: 14px;

  &:not(:last-child) {
    margin-right: 27px;
  }

  & > input {
    display: none;
    float: left;
  }

  & > input + label {
    float: left;
    display: inline-block;
    position: relative;
    padding-left: 30px;
    margin-right: 20px;
    min-width: 90px;

    &:before {
      ${mixin.centeredY()};
      left: 0;
      display: block;
      width: 20px;
      height: 20px;
      content: ' ';
      background: url('${
        process.env.REACT_APP_CDN_URL
      }/admin/btn-radio-off.svg') no-repeat center;
      background-size: contain;
    }

    &:hover {
      cursor: pointer;
    }
  }

  & > input:checked + label {
    &:before {
      background-image: url('${
        process.env.REACT_APP_CDN_URL
      }/admin/btn-radio-on.svg');
    }
  }
`

export default function RadioGroup({ children }) {
  return <Wrap>{children}</Wrap>
}
