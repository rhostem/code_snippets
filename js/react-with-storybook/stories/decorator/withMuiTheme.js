import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: { button: { textTransform: 'none' } },
})

function MuiProvider({ children }: { children: React.ReactChildren }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

/**
 * storybook에 materil ui 테마를 추가하는 데코레이터
 */
const withMuiTheme = (storyfn: Function) => (
  <MuiProvider>{storyfn()}</MuiProvider>
)

export default withMuiTheme
