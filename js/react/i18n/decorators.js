import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

export const withI18n = storyFn => {
  return <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
}