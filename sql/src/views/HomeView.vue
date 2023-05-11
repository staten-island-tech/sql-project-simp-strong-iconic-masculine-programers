<script setup>
</script>

<template>
  <header>
    Who needs styling

    <ul>
      <li v-for="card in hehehehaw" :key="card.id">{{ this.$parent.card.name }}</li>
    </ul>
  </header>
</template>
