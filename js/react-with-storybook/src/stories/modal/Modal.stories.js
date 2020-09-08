import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Modal from '../../modal/Modal'
import { css } from 'styled-components'

export default {
  title: 'modal/Modal',
  decorators: [withKnobs],
}

export const Default = () => {
  const [isOpen, setIsOepn] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOepn(!isOpen)
  }, [isOpen])

  return (
    <div>
      <h1>Modal</h1>
      <button onClick={toggleModal}>open modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentCSS={css`
          border: 10px solid #eee;
        `}
      >
        <button onClick={toggleModal}>CLOSE MODAL</button>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus praesentium voluptatum earum est qui eos eum beatae
          error, animi ab at itaque libero ad suscipit ut maxime dolor porro
          tenetur? lorem1000
        </p>
      </Modal>
    </div>
  )
}

export const OverflowContent = () => {
  const dummyText = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore magni doloribus, doloremque dolorum animi, unde rerum harum, asperiores molestias sit at omnis debitis! Architecto voluptas officiis at cupiditate veritatis?
  `

  return (
    <Modal
      isOpen={true}
      contentCSS={css`
        height: 300px;
      `}
    >
      {new Array(30).fill(null).map((_, i) => {
        return <div key={i}>{dummyText}</div>
      })}
    </Modal>
  )
}
export const OverflowContentWithFixedSubmitButton = () => {
  const dummyText = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tempore magni doloribus, doloremque dolorum animi, unde rerum harum, asperiores molestias sit at omnis debitis! Architecto voluptas officiis at cupiditate veritatis?
  `

  return (
    <Modal
      isOpen={true}
      contentCSS={css`
        height: 300px;
      `}
    >
      <div
        css={`
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow-y: scroll;
          padding-bottom: 100px;
        `}
      >
        {new Array(30).fill(null).map((_, i) => {
          return <div key={i}>{dummyText}</div>
        })}
      </div>
      <div
        css={`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: #eaeaea;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <h2>SubmitButtonArea</h2>
      </div>
    </Modal>
  )
}

export const FullCoverContent = () => {
  return (
    <Modal
      isOpen
      isFullCover
      contentCSS={css`
        border: 10px solid blue;
      `}
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      praesentium voluptatum earum est qui eos eum beatae error, animi ab at
      itaque libero ad suscipit ut maxime dolor porro tenetur?
    </Modal>
  )
}
