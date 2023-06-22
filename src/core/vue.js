import { createApp } from 'vue'
import { createPinia } from 'pinia'


export default () => {
  console.log('Initial Vue / Pinia')
  const vue = createApp({})
  const pinia = createPinia()

  vue.use(pinia)
}