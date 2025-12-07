<script setup lang="ts">
import type { WebinarItem } from '@/stores/webinarStore';
import GapComponent from "@/components/tools/GapComponent.vue";
import CountdownTimer from "@/components/tools/CountdownTimer.vue";

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();
</script>

<template>

  <div class="webinar-area-thanks-header-holder px-xl py-3x font-poppins">
    <div class="container-small">
      <h1 class="text-4xl font-light leading-tight font-rubik">{{activeWebinar.pdlpfw_thanks_headline}}</h1>
      <GapComponent responsiveConfig="0-30" />
      <div class="text-base font-medium leading-normal style-global-content" v-html="activeWebinar.pdlpfw_thanks_description"></div>
      <div v-if="activeWebinar.pdlpfw_thanks_countdown_enabled != 0">
        <GapComponent responsiveConfig="0-30" />
        <div class="CountdownTimer-holder">
          <CountdownTimer :activeWebinar="activeWebinar" />
        </div>
      </div>
    </div>


  </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/vars' as *;
.webinar-area-thanks-header-holder{
  background: var(--color-3);
  color: var(--color-2);
  height: calc(100vh - $footer-height);
  display: flex;
  justify-content: center;
  flex-direction: column;
  .CountdownTimer-holder{
    border-radius: var(--border-radius-big);
    background: var(--color-4);
    min-height: $countdown-min-height;
    max-width: 400px;
    margin: auto;
    padding: 2rem;
  }
}
</style>