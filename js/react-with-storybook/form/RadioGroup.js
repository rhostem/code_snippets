import React from 'react'
import styled, { css } from 'styled-components'

function clearfix() {
  return css`
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  `
}

const centerY = () => {
  return css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `
}

const Wrap = styled.div`
  ${clearfix()};
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
    padding-left: 20px;
    margin-right: 10px;
    min-width: 90px;

    &:before {
      ${centerY()};
      left: 0;
      display: block;
      width: 10px;
      height: 10px;
      content: ' ';
      border: 1px solid #000;
      border-radius: 50%;
    }

    &:hover {
      cursor: pointer;
    }
  }

  & > input:checked + label {
    &:before {
      background-color: #222;
    }
  }
`

export default function RadioGroup({ children }) {
  return <Wrap>{children}</Wrap>
}
