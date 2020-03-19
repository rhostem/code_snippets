import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {
  DragSource,
  DropTarget,
  DragSourceConnector,
  DragSourceMonitor,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import styled from 'styled-components'
import * as R from 'ramda'

type SortableItemProps = {
  index: number,
  id: number | string,
  onSort: Function,
  canDrag: boolean,
  canDrop: boolean,
}

const Wrap = styled.div`
  opacity: ${({ isDragging }) => (isDragging ? 0 : 1)};
  &:hover {
    cursor: grab;
  }
`

const itemType = 'SortarbleItem'

const dragSourceSpec = {
  canDrag({ canDrag = true }: SortableItemProps, monitor: DragSourceMonitor) {
    return canDrag
  },
  // droptarget monitor.getItem()으로 리턴하는 객체를 가져올 수 있음.
  beginDrag(
    props: SortableItemProps,
    monitor: DragSourceMonitor,
    component: SortableItem | null
  ) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const dragSourceCollect = (
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const dropTargetSpec = {
  canDrop({ canDrop = true }: SortableItemProps) {
    return canDrop
  },
  drop(
    props: SortableItemProps,
    monitor: DropTargetMonitor,
    component: SortableItem | null
  ) {
    const { onDropItem } = props

    if (typeof onDropItem === 'function') {
      onDropItem(monitor.getItem())
    }
  },

  /**
   * 컴포넌트 순서 정렬. 드래깅 컴포넌트와 드랍 타겟 컴포넌트의 수직 위치를 비교해서 순서를 변경한다.
   */
  hover(
    props: SortableItemProps,
    monitor: DropTargetMonitor,
    component: SortableItem | null
  ) {
    if (!component) {
      return
    }

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // 같은 카드는 처리하지 않음
    if (hoverIndex === dragIndex) {
      return
    }

    const { height: dropTargetHeight, top: dropTargetTop } = findDOMNode(
      component
    ).getBoundingClientRect() // 드랍 타겟 컴포넌트의 화면상 위치와 크기

    const centerOfDropTarget = dropTargetTop + dropTargetHeight / 2
    const mouseY = monitor.getClientOffset().y
    const isDraggingUpper = mouseY > centerOfDropTarget // 타겟보다 위쪽으로
    const isDraggingLower = mouseY < centerOfDropTarget // 타겟보다 아래쪽으로

    const isSortRequired =
      !props.isSorting &&
      ((isDraggingUpper && dragIndex > hoverIndex) ||
        (isDraggingLower && dragIndex < hoverIndex))

    if (isSortRequired) {
      props.onSort(dragIndex, hoverIndex, () => {
        // 드랍하기 전까지는 인덱스가 업데이트되지 않는다. 그래서 정렬이 끝난 후 인덱스를 직접 수정.
        monitor.getItem().index = hoverIndex
      })
    }
  },
}

const dropTargetCollect = (
  connect: DropTargetConnector,
  monitor: DropTargetMonitor
) => {
  return {
    isOver: monitor.isOver(),
    connectDropTarget: connect.dropTarget(),
  }
}

class SortableItem extends Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging } = this.props

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div>
            <Wrap isDragging={isDragging}>{this.props.children}</Wrap>
          </div>
        )
      )
    )
  }
}

const withDragSource = DragSource(itemType, dragSourceSpec, dragSourceCollect)
const withDropSource = DropTarget(itemType, dropTargetSpec, dropTargetCollect)

export default R.compose(
  withDragSource,
  withDropSource
)(SortableItem)
