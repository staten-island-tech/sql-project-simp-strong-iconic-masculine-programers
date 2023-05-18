<script setup>
  import { supabase } from '../lib/sbClient'
  import { onMounted, ref, toRefs } from 'vue'
  import { defineStore } from 'pinia'

  const Database = ref([])

  async function getCR() {
  const { data } = await supabase.from('hehehehaw').select()
  Database.value = data
}


onMounted (() => {
  getCR()
})

</script>

<template>
  <header>
    Who needs styling

    <ul>
      <li v-for="card in Database" :key="card.id">{{ card.name }}</li>
    </ul>

  </header>
</template>
