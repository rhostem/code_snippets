import React, { Component } from 'react'
import { css } from 'styled-components'
import iconBold from './icon-bold.svg'
import iconUnorderedList from './icon-unordered-list.svg'
import iconImage from './icon-image.svg'
import { exec, init } from 'pell'
import styled from 'styled-components'

function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout // immediate가 true일 경우 최초 호출시 즉시 실행됨. 그 다음 호출부터는 debounce 적용.
    clearTimeout(timeout) // wait만큼의 시간이 지나지 않으면 clearTimeout 때문에 later가 실행되지 않음.
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// quizbuzz-app의 master 브랜치가 업데이트되면 앱의 마크업 스타일로 일치시킨다.
// import { markupStyle } from 'webapp/components/event/EventBodyMarkup'

const markupStyle = css`
  & * {
    font-size: 18px;
    color: inherit;
    font-weight: 400;
    line-height: 1.4;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  p {
    margin: 0.8rem 0;

    &:first-child {
      margin-top: 0;
    }
  }

  img {
    display: block;
  }

  b {
    color: #0e66eb;
    font-weight: 400;
  }

  ul {
    & > li {
      list-style: disc;
    }
  }
`

const actionbarColor = '#FFF !important;'
const borderColor = 'rgba(10, 10, 10, 0.1) !important;'
const borderStyle = 'solid !important;'
const borderWidth = '1px !important;'
// const buttonHeight = '30px !important;'
const buttonSelectedColor = '#F0F0F0 !important;'
// const buttonWidth = 'auto'
const contentHeight = '300px !important;'
const contentPadding = '10px !important;'

// https://github.com/jaredreich/pell#custom-styles
const TextEditorStyle = css`
  .pell {
    border: ${borderWidth} ${borderStyle} ${borderColor};
    box-sizing: border-box;
  }

  .pell-content {
    ${markupStyle};
    margin-top: 12px;
    box-sizing: border-box;
    height: ${contentHeight};
    outline: 0;
    overflow-y: auto;
    padding: ${contentPadding};
    border: solid 1px #dee0e4;
  }

  .pell-actionbar {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${actionbarColor};
    border-bottom: ${borderWidth} ${borderStyle} ${borderColor};
  }

  .pell-button {
    width: 46px;
    height: 40px;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    outline: 0;
    background-size: contain;
    margin-right: 8px;

    &[title='Bold'] {
      background-image: url(${iconBold});
      color: transparent;
    }
    &[title='Image'] {
      background-image: url(${iconImage});
      color: transparent;
    }

    &[title='Unordered List'] {
      background-image: url(${iconUnorderedList});
      color: transparent;
    }
  }

  .pell-button-selected {
    background-color: ${buttonSelectedColor};
  }
`

const Wrap = styled.div`
  width: 100%;
  ${TextEditorStyle}
`

type Props = {
  id?: string,
  onChange: Function,
  initialContent: string, // HTML
}

/**
 * https://github.com/jaredreich/pell
 */
export default class TextEditor extends Component<Props> {
  static defaultProps = {
    id: 'textEditor',
  }

  editor = null

  componentDidMount() {
    this.editor = init({
      element: document.getElementById(this.props.id),
      onChange: debounce(html => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(html)
        }
      }, 400),
      defaultParagraphSeparator: 'p',
      styleWithCSS: true,
      actions: [
        'bold',
        {
          name: 'image',
          result: () => {
            const url = window.prompt('이미지 주소 입력')
            if (url) exec('insertImage', url)
          },
        },
        'ulist',
      ],
    })

    this.editor.content.innerHTML = this.props.initialContent || ''
  }

  render() {
    return <Wrap id={this.props.id} />
  }
}
