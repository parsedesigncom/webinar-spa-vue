<script setup lang="ts">
import { onMounted } from 'vue';
import { useWebinarStore } from '@/stores/webinarStore';

const webinarStore = useWebinarStore();

onMounted(() => {
  webinarStore.loadWebinarConfig();
});
</script>

<template>
  <main>
    <div v-if="webinarStore.isLoading">
      Lade Webinar-Konfiguration...
    </div>

    <div v-else-if="webinarStore.error">
      Fehler: {{ webinarStore.error }}
    </div>

    <section v-else>
      <h1>Aktuelles Webinar</h1>
      <div v-if="webinarStore.config">
        <h1>config</h1>
        <pre>{{ webinarStore.config }}</pre>
      </div>
      <div v-else>
        No config found.
      </div>
      <div v-if="webinarStore.webinars">
        <h1>webinars</h1>
        <pre>{{ webinarStore.webinars }}</pre>
      </div>
      <div v-else>
        No webinars found.
      </div>
      <div v-if="webinarStore.startWebinarId">
        <h1>startWebinarId</h1>
        <pre>{{ webinarStore.startWebinarId }}</pre>
      </div>
      <div v-else>
        No startWebinarId found.
      </div>
      <div v-if="webinarStore.upcomingWebinars">
        <h1>upcomingWebinars</h1>
        <pre>{{ webinarStore.upcomingWebinars }}</pre>
      </div>
      <div v-else>
        No upcomingWebinars found.
      </div>
    </section>
  </main>
</template>

<style scoped>
pre{
  text-align: left;
  font-size: 1.2em;
}
</style>
