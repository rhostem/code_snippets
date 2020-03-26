import styled from 'styled-components'
import { useMemo } from 'react'

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
  width = 180,
  height = 60,
  fontSize = 18,
  color,
  background,
  fontWeight = 400,
  style = {},
  onClick = () => {},
}) {
  // 버튼 타입에 기반한 색
  const { typeColor, typeBackground } = useMemo(() => {
    switch (type) {
      case buttonTypes.BLUE:
        return {
          typeBackground: '#24497b',
          typeColor: '#fff',
        }
      case buttonTypes.YELLOW:
        return {
          typeBackground: '#f4ed7a',
          typeColor: '#fff',
        }
      case buttonTypes.GRAY:
        return {
          typeBackground: '#f4f6f8',
          typeColor: '#24497b',
        }

      default:
        break
    }
  }, [type])

  return (
    <CustomButton
      style={{
        color: color || typeColor,
        background: background || typeBackground,
        width: typeof width === 'number' ? width + 'px' : width,
        minHeight: typeof height === 'number' ? height + 'px' : height,
        borderRadius:
          typeof height === 'number' ? height / 2 + 'px' : parseInt(height) / 2,
        fontSize: typeof fontSize === 'number' ? fontSize + 'px' : fontSize,
        fontWeight,
        ...style,
      }}
      onClick={onClick}>
      {children}
    </CustomButton>
  )
}

export default Button
