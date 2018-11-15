import React, { Component } from 'react'
// import styled from 'styled-components'
import * as R from 'ramda'
import SortableItem from './SortableItem'
import { devLog } from 'utils/log'

const sortByInsert = ({ list = [], targetIndex = 0, insertIndex = 0 }) => {
  if (!Array.isArray(list) || list.length === 0) {
    return list
  }

  const target = R.clone(list[targetIndex])
  const result = R.pipe(
    R.remove(targetIndex, 1),
    R.insert(insertIndex, target)
  )(list)

  return result
}

type Props = {
  initialList: Array<{
    id: string | number,
    canDrop: boolean,
    canDrag: boolean,
    children: React.component,
  }>,
  // 부모 컴포넌트에 정렬된 리스트를 전달한다.
  onUpdateList: ({
    updatedList: Array,
    dragIndex: number,
    hoverIndex: number,
  }) => any,
  onDropItem: ({ id: any, index: number }) => any,
}

class SortableContainer extends Component<Props, *> {
  constructor(props) {
    super(props)

    // 전달받은 리스트를 초기값으로 설정한다. 이후 props로 전달된 list는 무시됨.
    this.state = {
      list: R.clone(this.props.initialList),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.initialList !== prevProps.initialList) {
      this.setState({ list: this.props.initialList })
    }
  }

  /**
   * SortableItem 정렬
   */
  handleSort = (dragIndex: number, hoverIndex: number) => {
    if (this.state.list[hoverIndex]) {
      const updatedList = sortByInsert({
        list: this.state.list,
        targetIndex: dragIndex,
        insertIndex: hoverIndex,
      })

      this.setState({
        list: updatedList,
      })

      devLog(`dragIndex, hoverIndex`, dragIndex, hoverIndex)

      if (typeof this.props.onUpdateList === 'function') {
        this.props.onUpdateList({ updatedList, dragIndex, hoverIndex })
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.list.map((item, index) => (
          <SortableItem
            key={item.id}
            id={item.id}
            index={index}
            onSort={this.handleSort}
            onDropItem={this.props.onDropItem}
            canDrag={item.canDrag}
            canDrop={item.canDrop}
          >
            {item.children()}
          </SortableItem>
        ))}
      </div>
    )
  }
}

export default R.compose(r => r)(SortableContainer)
