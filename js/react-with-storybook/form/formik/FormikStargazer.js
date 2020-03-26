import React, { useMemo, useCallback } from 'react'
import { useField } from 'formik'
import styled from 'styled-components'
import cn from 'classnames'

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  & > * {
    &:not(:first-child) {
      margin-left: 8px;
    }
  }
`

export const Star = styled.div`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-position: center;

  /* TODO: 이미지 수정 */
  background-image: url(${'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/128px-Empty_Star.svg.png'});

  &.on {
    /* TODO: 이미지 수정 */
    background-image: url(${'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Star.svg/864px-Black_Star.svg.png'});
  }

  &.isForm {
    &:hover {
      cursor: pointer;
    }
  }
`

/**
 * value 기반으로 이미지의 on,off 상태 결정
 */
export const useStatuses = (totalStars, value) => {
  const statuses = useMemo(() => {
    let items = []
    for (let i = 0; i < totalStars; i++) {
      items.push(parseInt(value, 10) > i ? true : false)
    }
    return items
  }, [totalStars, value])

  return [statuses]
}

/**
 * Formik 컴포넌트 안에서 사용해야 한다.
 * @param {*} param0
 */
export default function FormikStargazer({
  totalStars = 5,
  value = '5',
  name = 'fieldname',
  wrapperCSS = {},
  starCSS = {},
}) {
  const [statuses] = useStatuses(totalStars, value)

  // eslint-disable-next-line
  const [field, meta, helpers] = useField(name)

  const handleClickStar = useCallback(
    e => {
      helpers.setValue(e.target.dataset?.value)
    },
    [helpers]
  )

  console.log(`field`, field)

  return (
    <Wrap css={wrapperCSS}>
      {statuses.map((status, index) => {
        return (
          <Star
            className={cn('isForm', { on: status })}
            onClick={handleClickStar}
            data-value={index + 1}
            css={starCSS}></Star>
        )
      })}
    </Wrap>
  )
}
