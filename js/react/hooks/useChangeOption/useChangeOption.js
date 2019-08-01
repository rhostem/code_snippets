import { useState, useEffect } from 'react'

/**
 * 옵션을 선택하는 컴포넌트에 사용할 수 있는 커스텀 훅
 * @param {*} param0
 */
const useChangeOption = ({
  onChange = value => {},
  options = [], //
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue)
  const [label, setLabel] = useState('')
  const [optionsAvailable, setOptionsVisible] = useState(options)

  const handleChange = option => {
    setValue(option.value)
    onChange(option.value)
  }

  // 초기값 반영
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // 옵션이 변경되었을 때
  useEffect(() => {
    // 기본값 업데이트
    const defaultValue = options && options.length > 0 ? options[0].value : null

    setValue(defaultValue)
    onChange(defaultValue)
  }, [onChange, options])

  // 선택 가능한 옵션
  useEffect(() => {
    // 선택된 값 제외
    setOptionsVisible(options.filter(o => o.value !== value))
  }, [options, value])

  // 라벨 업데이트
  useEffect(() => {
    const target = options.find(o => o.value === value)
    setLabel(target ? target.label : '')
  }, [options, value])

  return [value, label, handleChange, optionsAvailable]
}

export default useChangeOption
