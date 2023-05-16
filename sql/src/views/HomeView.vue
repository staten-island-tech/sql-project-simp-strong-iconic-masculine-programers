<script setup>
  import Database from '../App.vue'


</script>

<template>
  <header>
    Who needs styling

    <ul>
      <li v-for="card in Database" :key="card.id">{{ card.name }}</li>
    </ul>

  </header>
</template>
