import React from 'react'
import styled from 'styled-components'
import { center } from 'styles/mixin/centered'

/**
 * 이미지 위에 마우스오버하면 삭제 버튼이 표시되는 형태
 */
const Wrap = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  .imageItem {
    position: relative;
    border: 1px solid #efefef;
    height: 120px;
    overflow: hidden;

    img {
      ${center}
      width: auto;
      height: 100%;
      z-index: 1;
    }

    button {
      ${center}
      z-index: 2;
      display: none;
      width: 60px;
      height: 60px;
      border-radius: 40px;
      background: rgba(255, 255, 255, 0.6)
        url('/static/images/common/close_x.png') 0 0 no-repeat;
      background-size: contain;
    }

    &:hover {
      button {
        display: block;
      }
    }
  }
`

/**
 * 첨부이미지 미리보기 그리드
 * onDelete에 이미지를 제거했을 때 실행할 콜백 전달
 * @param {} param0
 */
const ImagesPreviewGrid = ({ urls = [], onDelete = () => {} }) => {
  return (
    urls.length > 0 && (
      <Wrap>
        {urls.map((thumbnail, index) => {
          return (
            <div className={'imageItem'}>
              <img key={index} src={thumbnail}></img>
              <button type="button" onClick={() => onDelete(index)}></button>
            </div>
          )
        })}
      </Wrap>
    )
  )
}

export default ImagesPreviewGrid
