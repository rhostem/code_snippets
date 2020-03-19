/**
 * https://codesandbox.io/s/awesome-fermi-hkphb?fontsize=14
 */
import React from 'react'
import ReactDOM from 'react-dom'
import useChangeOption from './useChangeOption'

/**
 * 글쓰기 화면에서 게시판(=category) 선택
 */
const SampleSelect = ({
  onChange = value => {},
  options = [],
  initialValue,
}) => {
  const { value, label, handleChange } = useChangeOption({
    onChange,
    options,
    initialValue,
  })

  return (
    <div>
      <div>
        selected option:
        <span>
          {label} ({value})
        </span>
      </div>

      <select onChange={e => handleChange(e.target.value)}>
        {options.map(option => {
          return (
            <option value={option.value} selected={option.value === value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(
  <SampleSelect
    initialValue="3"
    options={[
      {
        label: 'one',
        value: '1',
      },
      {
        label: 'two',
        value: '2',
      },
      {
        label: 'three',
        value: '3',
      },
      {
        label: 'four',
        value: '4',
      },
    ]}
  />,
  rootElement
)
