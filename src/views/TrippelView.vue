<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()

function add() {
  counter.increment()
}
</script>

<template>
  <div>
    <h1>Counter: {{ counter.count }}</h1>
    <p>Trippel: {{ counter.trippel }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<style scoped>

</style>