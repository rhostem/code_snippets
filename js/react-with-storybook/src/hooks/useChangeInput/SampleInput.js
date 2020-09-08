import React from 'react'
import useOnChange from './useOnChange'

export default function SearchInput({
  initialValue = '',
  onChange = (v) => {},
  wrapperStyle = {},
  placeholder = 'placeholder',
}) {
  const [value, handleChange] = useOnChange({
    initialValue,
    onChange,
  })

  return (
    <input
      value={value}
      onChange={(e) => {
        handleChange(e.target.value)
      }}
      placeholder={placeholder}
      type="text"
    />
  )
}
