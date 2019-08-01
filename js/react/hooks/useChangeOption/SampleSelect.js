import React from 'react'
import SlideUpOptions from '../form/SlideUpOptions'
import css from './BoardSelector.module.scss'
import useChangeOption from 'components/hooks/useChangeOption'

/**
 * 글쓰기 화면에서 게시판(=category) 선택
 */
const SampleSelect = ({
  onChange = value => {},
  options = [],
  initialValue,
}) => {
  const [value, label, handleChange, optionsAvailable] = useChangeOption({
    onChange,
    options,
    initialValue,
  })

  return (
    <select onChange={handleChange}>
      {optionsAvailable.map(option => {
        return <option value={option.value}>{option.label}</option>
      })}
    </select>
  )
}

export default BoardSelector
