/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from 'nuxt-i18n'

import { Utils } from '@/plugins/utils'

import { SearchUtils } from '@/plugins/searchUtils'

// vueインスタンス用
declare module 'vue/types/vue' {
  interface Vue {
    readonly $utils: Utils
    readonly $searchUtils: SearchUtils
  }
}
