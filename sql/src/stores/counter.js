import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userTest = defineStore('counter', () => {
  const username = ref('test')
  const password = ref('12345')
  loggedIn = false

  return { username, password, loggedIn }
})
