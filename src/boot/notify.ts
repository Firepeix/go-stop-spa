import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $notify: Notify
  }
}

export class Notify {
  private readonly vue: Vue

  constructor (vue: Vue) {
    this.vue = vue
  }

  public error (message = '') {
    message = message === '' ? 'Ocorreu um erro, tente novamente mais tarde!' : message;
    this.vue.$q.notify({ color: 'red-5', textColor: 'white', icon: 'warning', message, position: 'bottom-right' })
  }

  public success (message: string) {
    this.vue.$q.notify({ color: 'green', textColor: 'white', icon: 'cloud_done', message, position: 'bottom-right' })
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$notify = new Notify(Vue.prototype)
})
