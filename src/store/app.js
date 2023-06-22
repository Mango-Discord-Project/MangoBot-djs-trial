import { defineStore } from 'pinia'

export const useAppStore = defineStore('count', {
  state: () => ({
    client: null,
    commandActionMap: null
  }),
  getters: {},
  actions: {} 
})