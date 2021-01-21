import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $API_URL: string
  }
}
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$API_URL = process.env.GO_STOP_API_URL
})
