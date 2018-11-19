export const PhoneInput = ({ onChange, onBlur, ...rest }) => {
  const onChangeInput = e => {
    if (typeof onChange === 'function') {
      onChange(addHyphenToCellPhone(e.target.value))
    }
  }

  const onBlurInput = e => {
    const phonenum = confirmPhoneFormat(e.target.value)
    if (typeof onBlur === 'function') {
      onBlur(phonenum)
    } else {
      onChange(phonenum)
    }
  }

  return <input onChange={onChangeInput} onBlur={onBlurInput} {...rest} />
}

export default Input
