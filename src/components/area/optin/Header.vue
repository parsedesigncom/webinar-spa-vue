
<script setup lang="ts">
import type { WebinarItem } from '@/stores/webinarStore';
import GapComponent from "@/components/tools/GapComponent.vue";
import WebinarCta from "@/components/area/optin/Cta.vue";

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();


</script>

<template>
  <div class="webinar-area-optin-header-holder px-xl py-3xl">
    <div class="pdlpfw_ticker_headline">
      <h2 class="text-lg font-rubik font-medium  text-center leading-tight">{{ activeWebinar.pdlpfw_ticker_headline || 'Webinar' }}</h2>
    </div>
    <GapComponent responsiveConfig="0-10" />
    <div class="pdlpfw_webinar_title">
      <h1 class="text-4xl font-rubik font-light text-center leading-tight">{{ activeWebinar.pdlpfw_webinar_title || 'Webinar' }}</h1>
    </div>
    <GapComponent responsiveConfig="0-30" />
    <div class="pdlpfw_webinar_short_description container-small">
      <p class="text-lg font-poppins font-light text-center leading-tight">
        {{ activeWebinar.pdlpfw_webinar_short_description }}
      </p>
    </div>
    <GapComponent responsiveConfig="0-40" />
    <WebinarCta :activeWebinar="activeWebinar" />

  </div>
</template>

<style lang="scss" scoped>
.webinar-area-optin-header-holder{
  background: var(--color-3);
  color: var(--color-2);
  .pdlpfw_ticker_headline{
    text-align: center;
    h2{
      display: inline-block;
      margin: auto;
      color: var(--color-3);
      background-color: var(--color-4);
      -webkit-mask-image: url('/src/assets/mask.svg');
      mask-image: url('/src/assets/mask.svg');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      padding: 10px 30px;
      fill: #000000;
    }
  }
  .pdlpfw_webinar_title{}
  .pdlpfw_webinar_short_description{}
}
</style>