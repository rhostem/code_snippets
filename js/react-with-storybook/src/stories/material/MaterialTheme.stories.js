import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  select,
  object,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { createMuiTheme, Box, Button, ThemeProvider } from '@material-ui/core'
import { green, amber, grey } from '@material-ui/core/colors'

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
        <Button variant="contained" color="primary">
          primary
        </Button>
        <Button variant="contained" color="secondary">
          secondary
        </Button>
        <Button variant="contained">no color</Button>
        <pre
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(defaultTheme, null, 2),
          }}
        ></pre>
      </Box>
    </ThemeProvider>
  )
}

export const CustomThemeObject = () => {
  const customTheme = createMuiTheme(
    object('custom Mui theme', {
      palette: {
        primary: {
          main: green[400],
          contrastText: '#fff',
        },
        secondary: {
          main: amber[400],
          contrastText: grey[900],
        },
      },
    })
  )

  return (
    <ThemeProvider theme={customTheme}>
      <Box>
        <h1>custom theme object</h1>
        <Button variant="contained" color="primary">
          primary
        </Button>
        <Button variant="contained" color="secondary">
          secondary
        </Button>
        <Button variant="contained">no color</Button>
        <pre
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(customTheme, null, 2),
          }}
        ></pre>
      </Box>
    </ThemeProvider>
  )
}
