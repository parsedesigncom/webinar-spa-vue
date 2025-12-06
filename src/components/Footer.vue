<script setup lang="ts">

import type { WebinarItem } from '@/stores/webinarStore';
import GapComponent from "@/components/tools/GapComponent.vue";

// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();


</script>

<template>
  <div class="Footer-holder">
    <div class="footer text-sm font-poppins leading-snug">
      <div class="left">
        <div class="branding">
          {{ activeWebinar.pdlpfw_branding_brand }}
        </div>
        <div class="parsedesign">
          Design and automation by <a href="https://link.parsedesign.com/webinar-spa" target="_blank"> parsedesign</a>
        </div>
      </div>
      <div class="right">
        <ul>
          <li>
            <a :href="activeWebinar.pdlpfw_branding_imprint_url" target="_blank">{{activeWebinar.pdlpfw_branding_imprint_label}}</a>
          </li>
          <li>
            <a :href="activeWebinar.pdlpfw_branding_privacy_url" target="_blank">{{activeWebinar.pdlpfw_branding_privacy_label}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;
.Footer-holder{
  background: var(--color-1);
  color: var(--color-2);
  .footer{
    min-height: $footer-height;
    display: flex;
    flex-direction: column;
    max-width: $breakpoint-default;
    margin: 0 auto;
    padding: 2rem;
    @media (min-width: $breakpoint-default) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .left{
      order: 2;
      @media (min-width: $breakpoint-default) {
        order: 1;
      }
      .parsedesign{
        font-size: 0.5rem;
        a{
          color: var(--color-2);
          text-decoration: none;
          &:hover{
            color: var(--color-2);
          }
        }
      }
    }
    .right{
      padding-bottom: 1rem;
      order: 1;
      @media (min-width: $breakpoint-default) {
        padding: 0;
        order: 2;
      }
      ul{
        list-style: none;
        a{
          color: var(--color-2);
          text-decoration: none;
          &:hover{
            color: var(--color-2);
          }
        }
      }
    }
  }

}

</style>