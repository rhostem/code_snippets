import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import PellTextEditor from '../../editor/PellTextEditor'

export default {
  title: 'editor/PellTextEditor',
  decorators: [withKnobs],
}

export const Default = () => (
  <PellTextEditor
    onChange={html => {
      console.log(`html`, html)
    }}
  ></PellTextEditor>
)
