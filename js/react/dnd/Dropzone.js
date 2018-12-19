import React from 'react'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget, DragDropContext } from 'react-dnd'
import * as R from 'ramda'
import styled from 'styled-components'
import { devLog } from 'utils/log'
import mixin from 'styles/mixin'
import { IMAGE_FILE_REGEX, VIDEO_FILE_REGEX } from 'constant'

const DEFAULT_WIDTH = '160px'
const DEFAULT_HEIGHT = '130px'

const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${DEFAULT_WIDTH};
  width: 100%;
  min-height: ${DEFAULT_HEIGHT};
  height: 100%;
  background-color: ${({ isOver }) => (isOver ? '#1f5de6' : '#fff')};
  border: solid 1px #dee0e4;
  font-weight: bold;
  color: ${({ isOver }) => (isOver ? '#fff' : '#444')};
`

export const ButtonArea = styled.div`
  ${mixin.centered()};
  color: #7d7d7d;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
`
export const DropzoneButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #374146;
  color: #fff;
  font-size: 14px;
  color: #ffffff;
`

type Props = {
  onDrop: Function,
  onClick: Function,
  fileTypeRegex?: string, // 드랍 가능한 파일 타입 정규표현식 ex) ^image\/(png|jpg|jpeg|gif)$
  style?: any,

  // from collect
  connectDropTarget: Fuction,
  isOver: boolean,
  canDrop: boolean,
  itemType: string,
}

/**
 * 이미지 드랍 영역.
 * 드랍한 파일 1개만 onDrop 함수에 전달한다.
 */
class DropZone extends React.Component<Props> {
  props: Props

  constructor(props: Props) {
    super(props)
    this.state = {}

    this.hiddenInput = React.createRef()
  }

  openFinder = e => {
    this.hiddenInput.current.click()
  }

  render() {
    const { connectDropTarget, isOver, style, buttonComp } = this.props

    return connectDropTarget(
      <div style={{ width: '100%' }}>
        <Wrap style={style} isOver={isOver}>
          <input
            ref={this.hiddenInput}
            type="file"
            style={{ display: 'none' }}
            onChange={e => {
              this.props.onDrop(e.target.files)

              // 같은 파일을 선택했을 때도 콜백이 실행되도록
              this.hiddenInput.current.value = null
            }}
          />
          <ButtonArea>
            {buttonComp ? (
              buttonComp({ onClick: this.openFinder })
            ) : (
              <>
                <DropzoneButton type="button" onClick={this.openFinder}>
                  파일 선택
                </DropzoneButton>
                <div style={{ marginTop: '14px' }}>
                  여기에 이미지를 끌어놓으세요.
                </div>
              </>
            )}
          </ButtonArea>
        </Wrap>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor, component) {
    const { fileTypeRegex = /.+/, onDrop } = props
    const droppedFiles: Array<File> = monitor.getItem().files || []
    const isFile = R.all(file => file.constructor.name === 'File')(droppedFiles)
    const isFileTypeMatch =
      isFile && R.all(file => fileTypeRegex.test(file.type))(droppedFiles)

    devLog(`dropped files:`, droppedFiles)

    if (!isFileTypeMatch) {
      alert('유효하지 않은 파일 형식입니다.')
    } else {
      if (typeof onDrop === 'function') {
        onDrop(droppedFiles)
      }
    }
  },
  // hover(props, monitor, component) {},
  // canDrop(props, monitor, component) {
  //   return true
  // },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}

const composition = R.compose(
  DragDropContext(HTML5Backend),
  DropTarget(NativeTypes.FILE, spec, collect)
)

export const FileDropZone = composition(DropZone)

export const VideoDropZone = props => (
  <FileDropZone fileTypeRegex={VIDEO_FILE_REGEX} {...props} />
)

export const ImageDropZone = props => (
  <FileDropZone fileTypeRegex={IMAGE_FILE_REGEX} {...props} />
)
