import { createI18n } from 'vue-i18n' // import from runtime only

import { getLanguage } from '@/utils/cookies'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementIdLocale from 'element-plus/lib/locale/lang/id'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'
import idLocale from './l_id'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  },
  id: {
    ...idLocale,
    ...elementIdLocale
  }
}

export const getLocaleList = () => {
  return {
    en: 'English',
    'zh-cn': '中文',
    id: 'bahasa'
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is zh-cn
  return 'zh-cn'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
