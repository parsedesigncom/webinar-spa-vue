<script setup lang="ts">
import { computed, ref } from 'vue';
import { submitWebinarForm } from '@/services/webinarApi';
import GapComponent from "@/components/tools/GapComponent.vue";
import type { WebinarItem } from '@/stores/webinarStore';

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();

// State für das Popup
const showPopup = ref(false);

const formData = ref({
  name: '',
  email: ''
});

const openPopup = () => {
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};

const submitForm = async () => {
  try {
    // Aufruf der API Service Funktion
    await submitWebinarForm({
      name: formData.value.name,
      email: formData.value.email,
      webinarDate: props.activeWebinar.pdlpfw_webinar_date
    });

    console.log('Form submitted successfully');

    // Optional: Formular zurücksetzen
    formData.value = { name: '', email: '' };

    closePopup();
  } catch (error) {
    console.error('Error sending:', error);
    // Hier könntest du noch eine Fehlermeldung für den User anzeigen (z.B. über einen Toast oder Alert)
    alert('There was an error submitting the form.');
  }
};
</script>

<template>
  <div class="webinar-cta-holder">
    <div class="webinar-cta-container">
      <div class="webinar-cta-button">
        <div class="icon">
          <img :src="activeWebinar.pdlpfw_form_marketing_arrow" alt="" width="110" height="75">
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
          <div v-if="activeWebinar.pdlpfw_free_or_paid === 'free'" class="variant-free">
            <div v-if="activeWebinar.pdlpfw_form_description" class="text-base font-rubik text-center font-medium leading-normal">{{ activeWebinar.pdlpfw_form_description }}</div>
            <GapComponent responsiveConfig="0-30" />
            <form @submit.prevent="submitForm" class="optin-form">
              <input type="text" v-model="formData.name" :placeholder=" activeWebinar.pdlpfw_form_placeholder_name" class="px-lg py-md text-base font-medium leading-snug font-poppins" required>
              <GapComponent responsiveConfig="0-10" />
              <input type="email" v-model="formData.email" :placeholder="activeWebinar.pdlpfw_form_placeholder_email" class="px-lg py-md text-base font-medium leading-snug font-poppins" required>
              <GapComponent responsiveConfig="0-20" />
              <button type="submit" class="style-btn-scoped px-lg py-md text-md font-medium leading-snug font-rubik w-full">
                {{ activeWebinar.pdlpfw_form_submit_label || 'pdlpfw_form_submit_label' }}
              </button>
            </form>
          </div>

          <div v-else class="variant-paid">
            <div v-if="activeWebinar.pdlpfw_form_description" class="text-base font-rubik font-medium leading-normal">{{ activeWebinar.pdlpfw_form_description }}</div>
            <GapComponent responsiveConfig="0-30" />
            <a target="_blank" class="style-btn-scoped px-lg py-md text-md font-medium leading-snug font-rubik" :href="activeWebinar.pdlpfw_form_paid_link">{{ activeWebinar.pdlpfw_form_submit_label || 'Form submit label' }}</a>
          </div>
        </div>
      </div>
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
      button{
        border-radius: var(--border-radius);
        border: 1px solid  var(--color-cta-border);
        background: linear-gradient(to bottom, var(--color-cta-from), var(--color-cta-to));
        color: var(--color-cta-text);
        transition: transform 0.3s ease;
        &:hover{
          background: linear-gradient(to bottom, var(--color-cta-to), var(--color-cta-from));
          cursor: pointer;
          transform: scale(1.08);
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
        border-radius: var(--border-radius);
        color: var(--color-1);
        .style-btn-scoped{
          display: block;
          border-radius: var(--border-radius);
          width: 100%;
          text-align: center;
          border: 1px solid  var(--color-cta-border);
          background: linear-gradient(to bottom, var(--color-cta-from), var(--color-cta-to));
          color: var(--color-cta-text);
          text-decoration: none;
          transition: transform 0.3s ease;
          &:hover{
            background: linear-gradient(to bottom, var(--color-cta-to), var(--color-cta-from));
            cursor: pointer;
            transform: scale(1.01);
          }
        }
        .optin-form{
          display: flex;
          flex-direction: column;

          input{
            background:var(--color-2);
            border: 1px solid var(--color-6);
            padding: 10px;
            &:focus{
              outline: none;
            }
          }
        }
      }
      .close-btn {
        position: absolute;
        border-radius:0 var(--border-radius) 0 0;
        top: -1px;
        right: -1px;
        background: var(--color-1);
        border: none;
        font-size: 3rem;
        cursor: pointer;
        line-height: 1;
        color: var(--color-2);
      }
    }
  }

}
</style>