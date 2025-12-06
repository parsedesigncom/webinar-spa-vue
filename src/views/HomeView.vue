
<script setup lang="ts">
import { computed, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useWebinarStore } from '@/stores/webinarStore';
import Loading from '@/components/tools/Loading.vue';
import AreaOptinHeader from '@/components/area/optin/Header.vue';
import AreaOptinBody from '@/components/area/optin/Body.vue';
import WebinarCta from "@/components/area/optin/Cta.vue";
import GapComponent from "@/components/tools/GapComponent.vue";
import Footer from '@/components/Footer.vue';

const webinarStore = useWebinarStore();
const route = useRoute();

// Aktuelle Step aus den URL-Parametern
const currentStep = computed(() => {
  return route.query.step as string || 'optin';
});

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

const cssVars = computed(() => {
  if (!activeWebinar.value) return {}

  return {
    '--color-1': activeWebinar.value.pdlpfw_color_1,
    '--color-2': activeWebinar.value.pdlpfw_color_2,
    '--color-3': activeWebinar.value.pdlpfw_color_3,
    '--color-4': activeWebinar.value.pdlpfw_color_4,
    '--color-5': activeWebinar.value.pdlpfw_color_5,
    '--color-6': activeWebinar.value.pdlpfw_color_6,
    '--color-cta-from': activeWebinar.value.pdlpfw_color_cta_from,
    '--color-cta-to': activeWebinar.value.pdlpfw_color_cta_to,
    '--color-cta-border': activeWebinar.value.pdlpfw_color_cta_border,
    '--color-cta-text': activeWebinar.value.pdlpfw_color_cta_text
  }
})


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
  <div class="homeViewHolder" :style="cssVars">
    <div v-if="webinarStore.isLoading">
      <Loading name="Loading-b" width="200px" height="200px" />
    </div>

    <div v-else-if="webinarStore.error">
      Error: {{ webinarStore.error }}
    </div>

    <section v-else>

      <!-- Your actual template w01 / w02 etc. will be added here later -->

      <div v-if="activeWebinar">
        <div class="webinar-area webinar-area-optin" v-if="currentStep === 'optin'">
          <AreaOptinHeader :active-webinar="activeWebinar" />
          <AreaOptinBody :active-webinar="activeWebinar" />
          <GapComponent responsiveConfig="0-50" />
          <WebinarCta :activeWebinar="activeWebinar" />
          <GapComponent responsiveConfig="0-50" />
        </div>
        <div class="webinar-area webinar-area-thanks" v-if="currentStep === 'thanks'">
          thanks
        </div>
        <div class="webinar-area webinar-area-replay" v-if="currentStep === 'replay'">
          replay
        </div>

      </div>

      <!-- Your actual template w01 / w02 etc. will be added here later -->

      <p v-else>
        No webinar found.
      </p>
      <div v-if="activeWebinar">
        <Footer :activeWebinar="activeWebinar" />
      </div>

    </section>


  </div>
</template>

<style  lang="scss">
.homeViewHolder{
  background: var(--color-5);
  min-height: 100vh;
}



</style>