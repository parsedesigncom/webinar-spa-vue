<script setup lang="ts">
import { computed, ref } from 'vue';
import GapComponent from "@/components/tools/GapComponent.vue";
import type { WebinarItem } from '@/stores/webinarStore';

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();

// State für das Popup
const showPopup = ref(false);

const openPopup = () => {
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<template>
  <div class="webinar-cta-holder">
    <div class="webinar-cta-button">
      <div class="icon">
        <img :src="activeWebinar.pdlpfw_form_marketing_arrow" alt="">
      </div>
      <button @click="openPopup" class="px-lg py-md text-md font-medium leading-snug font-rubik">{{ activeWebinar.pdlpfw_form_submit_label || 'Form submit label' }}</button>
    </div>

    <!-- Popup Overlay -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content p-lg" @click.stop>
        <button class="close-btn" @click="closePopup">×</button>
        <p class="text-lg font-rubik font-medium text-center leading-tight">{{ activeWebinar.pdlpfw_ticker_headline || 'Webinar' }}</p>
        <GapComponent responsiveConfig="0-10" />
        <p class="text-xl font-rubik font-medium text-center leading-tight">{{ activeWebinar.pdlpfw_webinar_title || 'Webinar' }}</p>
        <GapComponent responsiveConfig="0-30" />
        <div v-if="activeWebinar.pdlpfw_form_description" class="text-base font-rubik font-medium leading-normal">{{ activeWebinar.pdlpfw_form_description || 'Webinar' }}</div>
        <GapComponent responsiveConfig="0-30" />
        <div v-if="activeWebinar.pdlpfw_free_or_paid === 'free'" class="variant-free">

        </div>

        <div v-else class="variant-paid">
          <a target="_blank" class="style-btn-scoped px-lg py-md text-md font-medium leading-snug font-rubik" :href="activeWebinar.pdlpfw_form_paid_link">{{ activeWebinar.pdlpfw_form_submit_label || 'Form submit label' }}</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.webinar-cta-holder{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .webinar-cta-button{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -130px;
    .icon{
      max-width: 120px;
      margin-right: 10px;

    }
    button{
      border: 1px solid  var(--color-cta-border);
      background: linear-gradient(to bottom, var(--color-cta-from), var(--color-cta-to));
      color: var(--color-cta-text);
      &:hover{
        background: linear-gradient(to bottom, var(--color-cta-to), var(--color-cta-from));
        cursor: pointer;
      }
    }
  }
  /* Popup Styles */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .popup-content {
      background: var(--color-2);
      position: relative;
      width: 720px;
      max-width: 90%;
      color: var(--color-1);
      .style-btn-scoped{
        display: block;
        text-align: center;
        border: 1px solid  var(--color-cta-border);
        background: linear-gradient(to bottom, var(--color-cta-from), var(--color-cta-to));
        color: var(--color-cta-text);
        text-decoration: none;
        &:hover{
          background: linear-gradient(to bottom, var(--color-cta-to), var(--color-cta-from));
          cursor: pointer;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 0px;
      right: 0px;
      background: var(--color-1);
      border: none;
      font-size: 3rem;
      cursor: pointer;
      line-height: 1;
      color: var(--color-2);
    }
  }
}






</style>