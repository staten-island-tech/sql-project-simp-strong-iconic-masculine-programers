<template>
  <div class="bg"></div>
  <div class="main">
    <form class="row flex-center flex" @submit.prevent="handleLogin" autocomplete="on">
      <h1 class="title">Friend Finder</h1>
      <h1>Your Account</h1>
      <div class="col-6form-widget">
        <h1 class="header">Sign In</h1>
        <div>
          <input class="inputField" required type="email" placeholder="Email" v-model="loginEmail" autocomplete="email" />
        </div>
        <div>
          <input class="inputField" required type="password" placeholder="Password" v-model="loginPassword"
            autocomplete="current-password" />
        </div>
        <div>
          <input type="submit" class="button block" :value="loadingLogin ? 'Logging in...' : 'Sign In'"
            :disabled="loadingLogin" />
        </div>
      </div>
      <h1>Not a member?</h1>
      <RouterLink to="/register" class="register"> Register Here </RouterLink>
      <RouterLink to="/" class="register"> Home </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { RouterLink, useRouter } from 'vue-router'
import { storage } from '../store/pinia'
import { onMounted } from 'vue'

const router = useRouter()
const loadingLogin = ref(false)
const loginEmail = ref('')
const loginPassword = ref('')
const storedSession = storage()

const handleLogin = async () => {
  try {
    loadingLogin.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.log(error)
  } finally {
    loadingLogin.value = false
    if (storedSession.session.user.role === 'authenticated') {
      router.push(`/account/${storedSession.session.user.id}`)
    }
  }
}

onMounted(() => {
  if (storedSession.session !== null) {
    router.push(`/account/${storedSession.session.user.id}`)
  }
})
</script>

<style scoped>
.bg {
  background: linear-gradient(90deg, #a4baf5, #c8e74d, #f5a2a1);
  background-size: 300% 300%;
  animation: gradient 4s alternate infinite;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}


.title {
  font-size: 3rem;
}

.col-6form-widget {
  width: 700px;
}

form {
  display: flex;
  width: 740px;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
}

.inputField {
  width: 100%;
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
}

.button {
  font-weight: bold;
  width: 100%;
  height: 40px;
  color: #ffffff;
  background-color: #f5a2a1;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button.block {
  display: block;
  margin-bottom: 20px;
}

.header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.register {
  border-style: solid;
  border-color: #ffffff;
  font-weight: bold;
  text-align: center;
  width: 80%;
  display: inline-block;
  padding: 10px 20px;
  background-color: #ffffff;
  color: #f5a2a1;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.register:hover {
  background-color: #f5a2a1;
  color: #ffffff;
}

.router-link-active {
  background-color: #f5a2a1;
}
</style>
