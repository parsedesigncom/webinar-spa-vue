<script setup lang="ts">
import { computed } from 'vue'
import type { WebinarItem } from '@/stores/webinarStore';
// Define die activeWebinar prop
const props = defineProps<{
  activeWebinar: WebinarItem
}>();

const rawDate = computed(() => props.activeWebinar.pdlpfw_webinar_date ?? '')
const dateObj = computed(() => new Date(rawDate.value.replace(' ', 'T')))
const webinarDay = computed(() => dateObj.value.getDate())
const webinarTime = computed(() => {
  const h = dateObj.value.getHours().toString().padStart(2, '0')
  const m = dateObj.value.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
})

</script>

<template>
  <div class="calendar-holder">
    <div class="calendar font-rubik font-light m-auto font-semibold ">
      <div class="month background py-sm">{{ activeWebinar.pdlpfw_webinar_date_label_month }}</div>
      <div class="body py-sm">
        <div class="day">{{ activeWebinar.pdlpfw_webinar_date_label_day }}</div>
        <div class="date">{{ webinarDay }}</div>
      </div>
      <div class="time background py-sm">{{ webinarTime }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$calndar-size: 100px;

.calendar-holder{
  .calendar {
    width: $calndar-size;
    min-width: 80%;
    text-align: center;
    box-shadow: 0px 0px 10px var(--color-6);
    background: var(--color-5);
    color: var(--color-1);
    border-radius: var(--border-radius);
    overflow: hidden;
    font-size: calc($calndar-size * 0.10);
    .background {
      background: var(--color-3);
      color: var(--color-2);
    }

    .month {
      text-transform: uppercase;
      font-size: calc($calndar-size * 0.15);

    }

    .day {
      line-height: 1;
    }

    .date {
      line-height: 1;
      font-size: calc($calndar-size * 0.4);
    }

    .time {
      font-size: calc($calndar-size * 0.2);
    }
  }
}

</style>