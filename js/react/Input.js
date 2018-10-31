import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: block;
  width: 100%;
  background-color: #ffffff;
  border: solid 1px #dee0e4;
  padding: 10px 12px;
  font-size: 12px;
  display: flex;
  align-items: center;

  & > input {
    flex: 1;
    border: none;
    background-color: transparent;

    &::placeholder {
      color: #727272;
    }
  }
`

type IconType = 'PASSWORD' | 'ID'

const getIconUrl = (icon: IconType) => {
  const iconUrl = {
    PASSWORD: `${process.env.REACT_APP_CDN_URL}/admin/icon-login-password.png`,
    ID: `${process.env.REACT_APP_CDN_URL}/admin/icon-login-id.png`,
  }

  return iconUrl[icon]
}

const Icon = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

type Props = {
  style?: Object,
  icon: IconTypes,
  value: string,
  onChange: Function,
  placeholder: string,
}

export default ({ style, icon, value, onChange, placeholder }: Props) => {
  return (
    <Wrap style={{ ...style }}>
      {!!icon ? <Icon src={getIconUrl(icon)} /> : null}

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Wrap>
  )
}
