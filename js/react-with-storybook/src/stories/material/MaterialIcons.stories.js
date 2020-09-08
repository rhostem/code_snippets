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
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp'
import SvgIcon from '@material-ui/core/SvgIcon'
import { green } from '@material-ui/core/colors'

export default {
  title: 'MaterialUI/Icons',
  decorators: [withKnobs],
}

export const IconsThemes = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      color: theme.palette.text.primary,
    },
  }))
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={4}>
        <Typography>Filled</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteIcon />
        <DeleteForeverIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Outlined</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteOutlinedIcon />
        <DeleteForeverOutlinedIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Rounded</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteRoundedIcon />
        <DeleteForeverRoundedIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Two Tone</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteTwoToneIcon />
        <DeleteForeverTwoToneIcon />
      </Grid>
      <Grid item xs={4}>
        <Typography>Sharp</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteSharpIcon />
        <DeleteForeverSharpIcon />
      </Grid>
    </Grid>
  )
}

export const SVGIconsColor = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
  }))

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    )
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon style={{ color: green[500] }} />
    </div>
  )
}
