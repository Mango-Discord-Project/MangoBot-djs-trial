import { createApp } from 'vue'
import { createPinia } from 'pinia'

export default () => {
  console.log('Vue Initial !')
  const vue = createApp({})
  const pinia = createPinia()

  vue.use(pinia)
}