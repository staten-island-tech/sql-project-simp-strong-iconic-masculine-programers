<template>
  <div class="bg"></div>
  <div class="main">
    <form class="row flex-center flex" @submit.prevent="handleRegister" autocomplete="on">
      <h1>Registration</h1>
      <div class="col-6form-widget">
        <h1 class="header">Create a new account</h1>
        <div class="email">
          <input class="input1Field" required type="email" placeholder="E-mail" v-model="registerEmail"
            autocomplete="email" />
          <h5>Note: An account activation email will be sent to the email address you provide.</h5>
        </div>
        <div>
          <input class="inputField" required type="password" placeholder="Password" v-model="registerPassword"
            autocomplete="current-password" />
        </div>

        <div>
          <input type="submit" class="button block" :value="loadingRegister ? 'Registering...' : 'Register'"
            :disabled="loadingRegister" />
        </div>
      </div>
      <h1>Already a member?</h1>
      <RouterLink to="/login" class="login">Sign In</RouterLink>
      <RouterLink to="/" class="login"> Home </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { storage } from '../store/pinia'

const storedSession = storage()
const loadingRegister = ref(false)
const registerEmail = ref('')
const registerPassword = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    loadingRegister.value = true
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select()
      .eq('email', registerEmail.value)

    if (usersData && usersData.length > 0) {
      alert('Email already registered.')
    } else {
      const { data: signUpData, signUpError } = await supabase.auth.signUp({
        email: registerEmail.value,
        password: registerPassword.value
      })

      if (signUpError) {
      } else {
        alert('Please check your email for confirmation.')
      }
    }
  } finally {
    loadingRegister.value = false
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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.col-6form-widget {
  width: 700px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h5 {
  color: black;
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

.input1Field {
  width: 100%;
  height: 40px;
  padding: 8px;
  /* margin-bottom: 16px; */
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
}

.email {
  margin-bottom: 16px;
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

.login {
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

.login:hover {
  background-color: #f5a2a1;
  color: #ffffff;
}

.router-link-active {
  background-color: #f5a2a1;
}
</style>
