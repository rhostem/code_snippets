// run storybook with command below
// "storybook": "start-storybook -s ./public -p 9000",

import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    allbackLng: {
      'ko-KR': ['ko'],
      'ja-JP': ['ja'],
      default: ['ko'],
    },

    load: 'languageOnly', // we only provide en, de -> no region specific locals li†ke en-US, de-DE

    // have a common namespace used around the full app
    ns: ['admin', 'common', 'eventLanding', 'quiz'],
    defaultNS: 'admin',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // debug: process.env.NODE_ENV !== 'production',
    debug: false,
    // saveMissing: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: (value, format) => {
        if (format === 'uppercase') return value.toUpperCase()
        return value
      },
    },
  })

export default i18n
