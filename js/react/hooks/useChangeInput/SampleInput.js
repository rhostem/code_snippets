import React from 'react'
import useChangeInput from './useChangeInput'

export default function SampleInput({
  initialValue,
  onChange = v => {},
  placeholder,
}) {
  const [value, handleChange] = useChangeInput({ initialValue, onChange })

  return (
    <input
      value={value}
      onChange={e => handleChange(e.target.value)}
      placeholder={placeholder}
      type="text"
    />
  )
}
