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
import { createMuiTheme, Checkbox, makeStyles, Box } from '@material-ui/core'
import { ThemeProvider } from 'styled-components'

export default {
  title: 'MaterialUI/theme',
  decorators: [withKnobs],
}

/**
 * 파라미터로 전달한 객체는 기본 테마를 그대로 전달한 것이다.
 */
const defaultTheme = createMuiTheme({})

export const DefaultThemeObject = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box>
        <h1>default theme object </h1>
        <pre
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(defaultTheme, null, 2),
          }}
        ></pre>
      </Box>
    </ThemeProvider>
  )
}
