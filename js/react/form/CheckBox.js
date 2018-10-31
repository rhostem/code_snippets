import * as React from 'react'
import styled from 'styled-components'
import { color, mixin } from 'styles'

const CheckBoxGroup = styled.div`
  display: inline-flex;
  align-items: center;

  & > input {
    display: none;
  }

  & > input + label {
    display: inline-block;
    position: relative;
    padding-left: 30px;
    height: 20px;
    font-size: 12px;
    color: ${color.text};
    margin-bottom: 0;

    &:hover {
      cursor: pointer;
    }

    &:before {
      ${mixin.centeredY()};
      left: 0;
      display: block;
      width: 20px;
      height: 20px;
      content: ' ';
      background-image: url('${
        process.env.REACT_APP_CDN_URL
      }/admin/btn-check-off.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  & > input:checked + label {
    &:before {
      background-image: url('${
        process.env.REACT_APP_CDN_URL
      }/admin/btn-check-on.svg');
    }
  }
`

type Props = {
  id: string,
  onChange: Function,
  children: any,
  checked: boolean,
  disabled?: boolean,
  name?: string,
}

class CheckBox extends React.Component<Props, any> {
  static defaultProps = {
    checked: false,
    disabled: false,
  }

  render() {
    const { children, id, onChange, checked, disabled, name } = this.props

    return (
      <CheckBoxGroup>
        <input
          id={id}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          name={name}
        />
        <label
          htmlFor={id}
          style={{
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {children || name}
        </label>
      </CheckBoxGroup>
    )
  }
}

export default CheckBox
