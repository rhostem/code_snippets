import React from 'react'
import useChangeInput from 'components/hooks/useChangeInput'

export default function SearchInput({
  initialValue = '',
  onChange = v => {},
  wrapperStyle = {},
  placeholder = 'placeholder',
}) {
  const { value, handleChange } = useChangeInput({
    initialValue,
    onChange,
  })

  return (
    <input
      value={value}
      onChange={e => {
        handleChange(e.target.value)
      }}
      placeholder={placeholder}
      type="text"
    />
  )
}
