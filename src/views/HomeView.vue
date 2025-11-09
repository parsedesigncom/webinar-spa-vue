<script setup lang="ts">
import { computed, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useWebinarStore } from '@/stores/webinarStore';

const webinarStore = useWebinarStore();
const route = useRoute();
const showDebug = ref(true);


/**
 * Determine active webinar:
 * - If URL has a :slug → find this webinar
 * - Otherwise → start webinar or first upcoming webinar
 */
const activeWebinar = computed(() => {
  const param = route.params.slug;
  const slug = typeof param === 'string' ? param : undefined;

  // Convert all webinars to an array
  const allWebinars = Object.values(webinarStore.webinars);

  if (slug) {
    // Adjust field names to match your API (e.g. webinar.slug or webinar.permalink)
    const found = allWebinars.find((webinar: any) => webinar.slug === slug);
    if (found) {
      return found;
    }
  }

  // No or unknown slug → fallback
  if (webinarStore.startWebinar) {
    return webinarStore.startWebinar;
  }

  if (webinarStore.upcomingWebinars && webinarStore.upcomingWebinars.length > 0) {
    return webinarStore.upcomingWebinars[0];
  }

  return null;
});

/**
 * Page title / heading
 */
const pageTitle = computed(() => {
  const webinar: any | null = activeWebinar.value;
  if (!webinar) return 'No active webinar found';

  return (
      webinar.pdlpfw_webinar_title ||
      webinar.slug ||
      'Webinar'
  );
});

/**
 * Debug helpers to continue seeing the raw data
 */
const debugConfig = computed(() =>
    webinarStore.config ? JSON.stringify(webinarStore.config, null, 2) : ''
);

const debugWebinars = computed(() =>
    webinarStore.webinars ? JSON.stringify(webinarStore.webinars, null, 2) : ''
);

const debugActiveWebinar = computed(() =>
    activeWebinar.value ? JSON.stringify(activeWebinar.value, null, 2) : ''
);


/**
 * Load data on first call (if nothing is there yet)
 */
onMounted(() => {
  if (!webinarStore.config && !webinarStore.isLoading) {
    webinarStore.loadWebinarConfig();
  }
});

</script>

<template>
  <main>
    <div v-if="webinarStore.isLoading">
      Loading webinar configuration...
    </div>

    <div v-else-if="webinarStore.error">
      Error: {{ webinarStore.error }}
    </div>

    <section v-else>

      <!-- Your actual template w01 / w02 etc. will be added here later -->

      <header v-if="activeWebinar">
        <h1>{{ pageTitle }}</h1>
        <p v-if="(activeWebinar as any).pdlpfw_webinar_subheadline">
          {{ (activeWebinar as any).pdlpfw_webinar_subheadline }}
        </p>
      </header>

      <!-- Your actual template w01 / w02 etc. will be added here later -->

      <p v-else>
        No webinar found.
      </p>


      <section v-if="showDebug" class="debug">
        <h2>Debug: Aktives Webinar</h2>
        <pre v-if="debugActiveWebinar">{{ debugActiveWebinar }}</pre>
        <p v-else>— kein aktives Webinar —</p>

        <h2>Debug: Config</h2>
        <pre v-if="debugConfig">{{ debugConfig }}</pre>
        <p v-else>— keine Config —</p>

        <h2>Debug: Alle Webinare (roh)</h2>
        <pre v-if="debugWebinars">{{ debugWebinars }}</pre>
        <p v-else>— keine Webinare —</p>
      </section>
      
    </section>


  </main>
</template>

<style scoped>
pre{
  text-align: left;
  font-size: 1.2em;
}
</style>
