import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 40px;
  background-color: #ffffff;
  border: solid 1px #dee0e4;
  padding: 0 12px;
  font-size: 14px;
  display: flex;
  align-items: center;

  & > input {
    flex: 1;
    border: none;
    background-color: transparent;
    font-size: inherit;
    outline: none;

    &::placeholder {
      color: #dee0e4;
    }
  }
`

type IconType = 'PASSWORD' | 'ID' | 'PHONE'

const getIconUrl = (icon: IconType) => {
  const iconUrl = {
    PASSWORD: null,
    ID: null,
    PHONE: null,
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
  type: string,
}

export default ({
  style, // css style
  icon, // 아이콘 타입
  iconSize = '20px', // 좌측 아이콘 크기
  value,
  onChange,
  placeholder,
  type, // html type
  children, // 인풋 오른쪽 영역, 검색
}: Props) => {
  return (
    <Wrap style={style}>
      {getIconUrl(icon) ? (
        <Icon
          src={getIconUrl(icon)}
          style={{ width: iconSize, height: iconSize }}
        />
      ) : null}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {children}
    </Wrap>
  )
}
