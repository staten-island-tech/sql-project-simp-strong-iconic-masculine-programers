<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { supabase } from './lib/sbClient'

const hehehehaw = ref([])

async function getCR() {
  const { data } = await supabase.from('hehehehaw').select()
  hehehehaw.value = data
}

onMounted (() => {
  getCR()
})

</script>

<template>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

  <RouterView />
</template>

<style scoped>

</style>
