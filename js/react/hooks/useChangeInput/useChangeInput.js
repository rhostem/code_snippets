import { useState, useEffect, useCallback } from 'react'

const useChangeInput = ({ intialValue, onChange = () => {} }) => {
  const [value, setValue] = useState(intialValue)

  const valueCallback = useCallback(
    v => {
      setValue(v)
      onChange(v)
    },
    [onChange]
  )

  const handleChange = value => {
    valueCallback(value)
  }

  useEffect(() => {
    valueCallback(intialValue)
  }, [intialValue, valueCallback])

  return [value, handleChange]
}

export default useChangeInput
