import React, { Component, Fragment } from 'react'
import Select from 'react-select' // https://react-select.com/

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
  menuPlacement: 'auto' | 'bottom' | 'top',
}

type State = {
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isRtl: boolean,
  isSearchable: boolean,
}

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '40px',
    boxShadow: 'none',
    borderColor: state.isFocused ? '#dee0e4' : '#dee0e4',
    '&:hover': {
      borderColor: '#dee0e4',
    },
  }),
  option: (base, state) => ({
    ...base,
    padding: '1rem',
    color: '#374146',
    fontWeight: state.isSelected ? 700 : 400,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#dee0e4',
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
    return (
      <Fragment>
        <Select
          {...this.props}
          instanceId={this.props.name}
          styles={customStyles}
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

export const FormSelectGlobalStyle = createGlobalStyle`
  .custom-single-select {
    position: relative;
    font-size: ${pTr(18)};

    .form-select__container {
      position: relative;
    }

    .form-select__control {
      -webkit-box-align: center;
      align-items: center;
      background-color: #fff;
      cursor: default;
      display: flex;
      flex-wrap: wrap;
      -webkit-box-pack: justify;
      justify-content: space-between;
      min-height: 2.21429rem;
      position: relative;
      box-sizing: border-box;
      padding-left: 0px;
      padding-right: 0px;
      border-radius: 0px;
      outline: none;
      transition: all 100ms ease 0s;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid rgb(216, 216, 216);

      &:hover {
        background-color: #fff;
      }
    }

    .form-select__value-container {
      -webkit-box-align: center;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      box-sizing: border-box;
      flex: 1 1 0%;
      padding: 2px 8px 2px 0px;

      input {
        font-size: inherit;
        width: 1px;
        color: transparent;
        left: -100px;
        opacity: 0;
        position: relative;
        transform: scale(0);
        background: 0px center;
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        outline: 0px;
        padding: 0px;
      }
    }

    .form-select__single-value {
      color: rgb(34, 34, 34);
      margin-left: 0px;
      margin-right: 2px;
      max-width: calc(100% - 8px);
      position: absolute;
      text-overflow: ellipsis;
      white-space: nowrap;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
      overflow: hidden;
    }

    .form-select__indicators {
      -webkit-box-align: center;
      align-items: center;
      align-self: stretch;
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
    }

    .form-select__clear-indicator {
      display: none;
    }

    .form-select__indicator-separator {
      display: none;
    }

    .form-select__dropdown-indicator {
      width: 0px;
      height: 0px;
      border-left: calc(0.428571rem) solid transparent;
      border-right: calc(0.428571rem) solid transparent;
      border-top: calc(0.5rem) solid rgb(0, 0, 0);

      & > svg {
        display: none;
      }
    }

    .form-select__option {
      font-weight: 400;
      color: #383838;
      background-color: #fff;
      &:hover {
        background-color: #fff;
        color: #383838;
      }
    }

    .form-select__placeholder {
      color: rgb(128, 128, 128);
      margin-left: 2px;
      margin-right: 2px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
    }

  }
`
