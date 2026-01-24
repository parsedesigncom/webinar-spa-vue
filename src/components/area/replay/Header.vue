<script setup lang="ts">
import type { WebinarItem } from '@/stores/webinarStore';
import GapComponent from "@/components/tools/GapComponent.vue";
import VideoEmbed from "@/components/tools/VideoEmbed.vue";
import ReplayCta from "@/components/area/replay/Cta.vue";

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();
</script>

<template>

  <div class="webinar-area-replay-header-holder px-xl py-3x font-poppins">
    <div class="replay-content">
      <h1 class="text-3xl font-light font-rubik text-center">{{activeWebinar.pdlpfw_replay_headline}}</h1>
      <GapComponent responsiveConfig="0-30" />
      <div class="grid">
        <div class="left">
          <VideoEmbed :src="activeWebinar.pdlpfw_replay_video" />
          <GapComponent responsiveConfig="0-50#1200-0" />
        </div>
        <div class="right">
          <div class="text-html text-md style-global-content" v-html="activeWebinar.pdlpfw_replay_description"></div>
          <GapComponent responsiveConfig="0-30" />
          <ReplayCta v-if="activeWebinar.pdlpfw_replay_cta_link" :activeWebinar="activeWebinar" />
        </div>
      </div>
    </div>


  </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/vars' as *;
$width-replay-page : 1200px;
.webinar-area-replay-header-holder{
  background: var(--color-3);
  color: var(--color-2);
  height: calc(100vh - $footer-height);
  display: flex;
  justify-content: center;
  flex-direction: column;
  .replay-content{
    max-width: 100%;
    width: $width-replay-page;
    background: var(--color-2);
    color: var(--color-1);
    padding: 2rem;
    border-radius: var(--border-radius-big);
    margin: 0 auto;
    h1{
      color: var(--color-1);
    }
    .grid{
      @media (min-width: $width-replay-page) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
      }
      .left{
        flex: 1;
      }
      .right{
        flex: 1;
      }

    }

  }
}
</style>