<script setup lang="ts">
import { computed, ref } from 'vue';
import { submitWebinarForm } from '@/services/webinarApi';
import GapComponent from "@/components/tools/GapComponent.vue";
import type { WebinarItem } from '@/stores/webinarStore';

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();

</script>

<template>
  <div class="webinar-cta-holder">
    <div class="webinar-cta-container">
      <div class="webinar-cta-button">
        <div class="icon">
          <img :src="activeWebinar.pdlpfw_form_marketing_arrow" alt="" width="110" height="75">
        </div>
        <a target="_blank" class="px-lg py-md text-md font-medium leading-snug font-rubik" :href="activeWebinar.pdlpfw_replay_cta_link">{{ activeWebinar.pdlpfw_replay_cta_label }}</a>

      </div>

      <!-- Popup Overlay -->
    </div>


  </div>
</template>

<style scoped>
.webinar-cta-holder{
  .webinar-cta-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .webinar-cta-button{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: -110px;
      .icon{
        max-width: 110px;
        margin-right: 10px;

      }
      a{
        border-radius: var(--border-radius);
        border: 1px solid  var(--color-cta-border);
        background: linear-gradient(to bottom, var(--color-cta-from), var(--color-cta-to));
        color: var(--color-cta-text);
        transition: transform 0.3s ease;
        text-decoration: none;
        &:hover{
          background: linear-gradient(to bottom, var(--color-cta-to), var(--color-cta-from));
          cursor: pointer;
          transform: scale(1.08);
        }
      }
    }

  }

}
</style>