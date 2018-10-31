import React, { Component, Fragment } from 'react'
import Select from 'react-select' // https://react-select.com/
import chroma from 'chroma-js'

type Option = {
  value: string, // 실제 값
  label: string, // 표시 값
}

type Props = {
  name: string, // name property of input tag
  placeholder: string, // input placeholder
  options: Option[], // options array
  onChange: (
    option: Object | Array<Object> | null | undefined,
    action: Object
  ) => undefined,
}

type State = {
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isRtl: boolean,
  isSearchable: boolean,
}

const optionBgColor = chroma('#ff9e03')

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: 'blue',
  }),
  option: (base, state) => ({
    ...base,
    padding: '1rem',
    fontWeight: state.isSelected ? 700 : 400,
    backgroundColor: state.isSelected
      ? optionBgColor.css()
      : optionBgColor.alpha(0.2).css(),
    '&:hover': {
      backgroundColor: 'hotpink',
    },
  }),
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...base, opacity, transition }
  },
}

export default class SingleSelect extends Component<Props, State> {
  static defaultProps = {
    name: 'select-name',
    options: [],
    placeholder: 'Select',
    className: 'reactSelect--single',
  }

  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  }

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }))

  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }))

  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }))

  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }))

  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }))

  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state

    const { options, name, placeholder, onChange, className } = this.props

    return (
      <Fragment>å
        <Select
          name={name}
          options={options}
          defaultValue={options[0]}
          placeholder={placeholder}
          onChange={onChange}
          styles={customStyles}
          className={className}
          classNamePrefix="select"
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
        />
      </Fragment>
    )
  }
}
