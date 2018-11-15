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
  beginDrag(props: SortableItemProps, monitor: DragSourceMonitor, component: SortableItem | null) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const dragSourceCollect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const dropTargetSpec = {
  canDrop({ canDrop = true }: SortableItemProps) {
    return canDrop
  },
  drop(props: SortableItemProps, monitor: DropTargetMonitor, component: SortableItem | null) {
    const { onDropItem } = props

    if (typeof onDropItem === 'function') {
      onDropItem(monitor.getItem())
    }
  },
  hover(props: SortableItemProps, monitor: DropTargetMonitor, component: SortableItem | null) {
    if (!component) {
      return
    }

    if (!props.canDrop) {
      return
    }

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // 같은 카드는 처리하지 않음
    if (hoverIndex === dragIndex) {
      return
    }

    // Determine rectangle on screen
    const targetBoundingRect = findDOMNode(component).getBoundingClientRect()

    // 타겟 박스 높이의 1/2
    const halfOfTargetHeight = targetBoundingRect.height / 2
    const mouseY = monitor.getClientOffset().y

    // 포인터와 드랍 타겟의 top포지션 사이의 거리
    const pointerToTargetTop = mouseY - targetBoundingRect.top

    // 마우스 위치가 타겟 아이템 높이의 절반보다 위에 있다.
    const isMouseHigherThanMiddleOfTarget = pointerToTargetTop < halfOfTargetHeight

    // 정렬을 할 필요가 없는 케이스 2개
    // 위쪽에 있는 아이템이 절반 이상 내려감
    const higherItemOveredTaget = dragIndex < hoverIndex && !isMouseHigherThanMiddleOfTarget
    // 아래쪽에 있는 아이템이 절반 이상 올라감
    const lowerItemOveredTarget = dragIndex > hoverIndex && isMouseHigherThanMiddleOfTarget

    if (higherItemOveredTaget || lowerItemOveredTarget) {
      props.onSort(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  },
}

const dropTargetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
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
