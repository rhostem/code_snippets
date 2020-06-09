import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import ReactDraftEditor from '../../editor/react-draft-wysiwyg/ReactDraftEditor'

export default {
  title: 'editor/ReactDraftEditor',
  decorators: [withKnobs],
}

export const Default = () => (
  <ReactDraftEditor
    onChange={html => {
      console.log(`html`, html)
    }}
  ></ReactDraftEditor>
)

export const InitialContents = () => (
  <ReactDraftEditor
    onChange={html => {
      console.log(`html`, html)
    }}
    initialContents={`
    <h4><span style="font-family: Tahoma;">Tahoma font</span></h4><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto sapiente cum aperiam cupiditate consequuntur, quis fuga at accusamus officiis obcaecati quia eius voluptatum tempora, repellendus itaque iure quod beatae ab!</p>`}
  ></ReactDraftEditor>
)
