export const PhoneInput = ({ onChange, onBlur, ...rest }) => {
  const onChangeInput = e => {
    if (typeof onChange === 'function') {
      onChange(addHyphenToCellPhone(e.target.value), e)
    }
  }

  const onBlurInput = e => {
    const phonenum = confirmPhoneFormat(e.target.value)
    if (typeof onBlur === 'function') {
      onBlur(phonenum, e)
    } else {
      onChange(phonenum, e)
    }
  }

  return (
    <input type="tel" onChange={onChangeInput} onBlur={onBlurInput} {...rest} />
  )
}

export default Input
