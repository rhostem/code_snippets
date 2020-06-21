import React, { useMemo } from 'react'
import styled from 'styled-components'

const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  min-height: 60px;
  border-radius: 30px;
  background: #24497b;
  color: #fff;
  font-size: 18px;
  letter-spacing: -0.9px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`

export const buttonTypes = {
  BLUE: 'BLUE',
  YELLOW: 'YELLOW',
  GRAY: 'GRAY',
}

/**
 * 앱에서 사용할 공용 버튼
 * @param {*} args
 */
function Button({
  children,
  type = buttonTypes.BLUE,
  style,
  onClick = () => {},
}) {
  const buttonStyle = useMemo(() => {
    return Object.assign(
      {
        width: '180px',
        height: '60px',
        fontSize: '18px',
        borderWidth: '1px',
        borderType: 'solid',
        borderRadius: parseInt(style.height || 60) / 2 + 'px',
      },
      style
    )
  }, [style])

  // 버튼 타입에 기반한 색
  const { typeColor, typeBackground, typeBorderColor } = useMemo(() => {
    switch (type) {
      case buttonTypes.BLUE:
        return {
          typeBackground: '#24497b',
          typeBorderColor: '#24497b',
          typeColor: '#fff',
        }
      case buttonTypes.YELLOW:
        return {
          typeBackground: '#f4ed7a',
          typeBorderColor: '#f4ed7a',
          typeColor: '#24497b',
        }
      case buttonTypes.GRAY:
        return {
          typeBackground: '#f4f6f8',
          typeBorderColor: '#24497b',
          typeColor: '#24497b',
        }

      default:
        return {
          typeBackground: '#24497b',
          typeColor: '#fff',
        }
    }
  }, [type])

  return (
    <CustomButton
      style={{
        // type style
        color: buttonStyle.color || typeColor,
        background: buttonStyle.background || typeBackground,
        border: `${buttonStyle.borderWidth} ${
          buttonStyle.borderType
        } ${buttonStyle.borderColor || typeBorderColor}`,
        ...buttonStyle,
      }}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  )
}

export default Button
