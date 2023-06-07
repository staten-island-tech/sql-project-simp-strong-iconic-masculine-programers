<template>
  <RouterView />
</template>
<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { supabase } from './lib/supabaseClient'
import { storage } from './store/pinia'

const storedSession = storage()
const router = useRouter()
const session = ref()
const showRegister = ref(false)

supabase.auth.onAuthStateChange((event, session) => {
  storedSession.session = session
})

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})

</script>
<style scoped></style>
