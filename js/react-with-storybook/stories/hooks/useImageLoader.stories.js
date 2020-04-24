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
import useImageLoader from '../../hooks/useImageLoader'
import useRandomImages from '../../hooks/useRandomImages'
import { css } from 'styled-components'

export default {
  title: 'hooks/useImageLoader',
  decorators: [withKnobs],
}

const ImageContainer = ({ url }) => {
  const [urlLoaded, isLoading] = useImageLoader(url)
  return (
    <div
      css={css`
        width: 300px;
      `}>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <img
          css={css`
            display: block;
            width: 100%;
            height: auto;
          `}
          src={urlLoaded}
          alt=""
        />
      )}
    </div>
  )
}

export const Default = () => {
  const [urls] = useRandomImages({ size: 5 })

  console.log(`urls`, urls)

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
      `}>
      {urls.map((url, index) => {
        return <ImageContainer key={index} url={url}></ImageContainer>
      })}
    </div>
  )
}
