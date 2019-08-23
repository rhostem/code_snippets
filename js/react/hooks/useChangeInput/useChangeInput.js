import { useState, useEffect } from 'react'

/**
 * input element 상태 관리 hook
 * @param {} args
 */
export default function useChangeInput({ initialValue, onChange = () => {} }) {
  const [value, setValue] = useState('')

  const handleChange = value => {
    setValue(value)
    onChange(value)
  }

  // initialValue 업데이트 반영
  useEffect(() => {
    setValue(initialValue)
    return () => {
      setValue('')
    }
  }, [initialValue])

  return {
    value,
    handleChange,
  }
}
