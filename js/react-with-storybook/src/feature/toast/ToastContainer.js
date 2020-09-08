import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { fixedCenterX } from 'styles/mixin/centered'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import FadeIn from 'features/toast/FadeIn'
import Toast from './Toast'

const Wrap = styled.div`
  ${fixedCenterX}
  z-index: 1000;
  bottom: 40px;
  background-color: rgba(0, 0, 0, 0);

  & > * {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`

export default function ToastContainer() {
  const toastQueue = useSelector((state: IRootState) => state.toast?.queue)

  return (
    <Wrap>
      <TransitionGroup appear>
        {toastQueue.map(toast => (
          <FadeIn>
            <Toast contents={toast.contents} />
          </FadeIn>
        ))}
      </TransitionGroup>
    </Wrap>
  )
}
