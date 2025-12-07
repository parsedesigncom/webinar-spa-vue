<script setup lang="ts">
import type { WebinarItem } from '@/stores/webinarStore';
import Calendar from '@/components/tools/Calendar.vue';
import CountdownTimer from '@/components/tools/CountdownTimer.vue';
import GapComponent from "@/components/tools/GapComponent.vue";
import WebinarCta from "@/components/area/optin/Cta.vue";
// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();
</script>

<template>
<div class="webinar-area-optin-body-holder">
  <div class="body-container mx-auto">
    <div class="body-left p-xl">
      <div class="pdlpfw_webinar_date_label">
        <Calendar :active-webinar="activeWebinar" />
      </div>
      <GapComponent responsiveConfig="0-30" />
      <img class="speaker-image responsive-image border-radius" :src="activeWebinar.pdlpfw_speaker_image">
      <GapComponent responsiveConfig="0-30" />
      <div class="speaker-data font-poppins text-center leading-snug font-regular text-base">
        <p>{{activeWebinar.pdlpfw_speaker_name}}</p>
        <p>{{activeWebinar.pdlpfw_speaker_job_title}}</p>
        <p class="text-sm">{{activeWebinar.pdlpfw_speaker_slogan}}</p>
      </div>
    </div>
    <div class="body-right p-xl">
      <CountdownTimer :activeWebinar="activeWebinar" />
      <GapComponent responsiveConfig="0-50" />
      <h3 class="font-rubik text-center text-lg leading-tight font-medium">{{activeWebinar.pdlpfw_bulletpoints_title}}</h3>
      <GapComponent responsiveConfig="0-30" />
      <ul class="pdlpfw_bulletpoint">
        <li v-if="activeWebinar.pdlpfw_bulletpoint_1">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_1"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_2">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_2"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_3">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_3"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_4">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_4"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_5">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_5"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_6">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_6"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_7">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_7"></div>
        </li>
        <li v-if="activeWebinar.pdlpfw_bulletpoint_8">
          <div class="icon">
            <svg fill="none" height="512" viewBox="0 0 24 25" width="512" xmlns="http://www.w3.org/2000/svg"><g fill="rgb(0,0,0)"><path d="m20.03 13.04c-.55 0-1 .45-1 1v1.35c0 2.01-1.64 3.65-3.65 3.65h-6.72c-2.01 0-3.65001-1.64-3.65001-3.65v-6.71996c0-2.01 1.64001-3.65002 3.65001-3.65002h1.34c.55 0 1-.45 1-1s-.45-1-1-1h-1.34c-3.12 0-5.65001 2.54002-5.65001 5.65002v6.71996c0 3.12 2.54001 5.65 5.65001 5.65h6.72c3.12 0 5.65-2.54 5.65-5.65v-1.35c0-.55-.45-1-1-1z"/><path d="m7.29 10.34c-.39.39-.39 1.02 0 1.41l3.26 3.26c.36.36.85.5599 1.36.5599h.12c.55-.03 1.06-.2999 1.4-.7399l6.35-8.16996c.34-.44.26-1.06003-.17-1.40003-.44-.34-1.06-.25995-1.4.17005l-6.3 8.10994-3.19999-3.2c-.39-.39003-1.02-.39003-1.41 0z"/></g></svg>
          </div>
          <div class="text style-global-content" v-html="activeWebinar.pdlpfw_bulletpoint_8"></div>
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/vars' as *;
$svg-icon-height: 25px;
.webinar-area-optin-body-holder{
  .body-container{
    border-radius: var(--border-radius-big);
    background: var(--color-4);
    margin-top: -3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-width: var(--breakpoint-default);
    @media (min-width: $breakpoint-default) {
      flex-direction: row;
    }

    .body-left{
      background: var(--color-2);
      flex: 1;
      order: 2;
      @media (min-width: $breakpoint-default) {
        order: 1;
      }
      .pdlpfw_webinar_date_label{
        color: var(--color-3);
      }
      .speaker-image{
        max-width: 80%;
      }
    }
    .body-right{
      flex: 1;
      ul.pdlpfw_bulletpoint{
        li{
          display: flex;
          flex-direction: row;
          gap: calc($svg-icon-height / 2);
          align-items: flex-start;
          margin-bottom: 10px;
          div.icon{
            max-width: $svg-icon-height;
            max-height: $svg-icon-height;
            svg{
              max-width: $svg-icon-height;
              max-height: $svg-icon-height;
              *{
                fill: var(--color-3);
              }
            }
          }
          div.text{
            font-family: var(--font-family-poppins);
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-light);
            color: var(--color-1);
            line-height: var(--line-height-snug);
            :deep(strong),
            :deep(b){
              font-weight: var(--font-weight-medium) ;
            }
          }
        }

      }
      order: 1;
      @media (min-width: $breakpoint-default) {
        order: 2;
      }
    }
  }
}
</style>