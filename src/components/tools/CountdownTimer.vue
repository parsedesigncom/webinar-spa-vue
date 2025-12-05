<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { WebinarItem } from "@/stores/webinarStore";

const props = defineProps<{
  activeWebinar: WebinarItem;
}>();

const activeWebinar = props.activeWebinar;

// ---- Countdown Logik ----

const finished = ref(false);
const remainingMs = ref(0);
let intervalId: number | null = null;

// Datum string in echtes Datum umwandeln
const targetTime = new Date(
    (activeWebinar.pdlpfw_webinar_date ?? '').replace(' ', 'T')
).getTime()

const timeLeft = computed(() => {
  const ms = Math.max(remainingMs.value, 0);

  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return { days, hours, minutes, seconds };
});

const pad = (n: number) => n.toString().padStart(2, "0");

const tick = () => {
  const diff = targetTime - Date.now();
  remainingMs.value = diff;

  if (diff <= 0) {
    finished.value = true;
    if (intervalId) clearInterval(intervalId);
  }
};

onMounted(() => {
  tick();
  intervalId = window.setInterval(tick, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="countdown-holder">
    <div class="headline text-center font-poppins text-xs">
      {{activeWebinar.pdlpfw_countdown_label}}
    </div>
    <div class="countdown font-rubik" v-if="!finished">
      <div class="unit" v-if="timeLeft.days > 0">
        <transition name="flip" mode="out-in">
            <span class="unit-value" :key="timeLeft.days">
              {{ pad(timeLeft.days) }}
            </span>
        </transition>
        <span class="unit-label">{{ activeWebinar.pdlpfw_countdown_label_days }}</span>
      </div>

      <div class="unit">
        <transition name="flip" mode="out-in">
            <span class="unit-value" :key="timeLeft.hours">
              {{ pad(timeLeft.hours) }}
            </span>
        </transition>
        <span class="unit-label">{{ activeWebinar.pdlpfw_countdown_label_hours }}</span>
      </div>

      <div class="unit">
        <transition name="flip" mode="out-in">
            <span class="unit-value" :key="timeLeft.minutes">
              {{ pad(timeLeft.minutes) }}
            </span>
        </transition>
        <span class="unit-label">{{ activeWebinar.pdlpfw_countdown_label_minutes }}</span>
      </div>

      <div class="unit">
        <transition name="flip" mode="out-in">
            <span class="unit-value" :key="timeLeft.seconds">
              {{ pad(timeLeft.seconds) }}
            </span>
        </transition>
        <span class="unit-label">{{ activeWebinar.pdlpfw_countdown_label_seconds }}</span>
      </div>
    </div>
    <div class="image">
      <img :src="activeWebinar.pdlpfw_countdown_frame">
    </div>
  </div>

</template>


<style lang="scss" scoped>
$countdown-size: 80px;
.countdown-holder{
  width: $countdown-size;
  min-width: 80%;
  margin: auto;
  position: relative;
  .countdown {
    display: flex;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    .unit {
      min-width: 3.2rem;
      background: transparent;
      color:  var(--color-1);
    }
    .unit-label {
      display: block;
      font-size: calc($countdown-size * 0.1);
      opacity: 0.7;
    }
    .unit-value {
      display: inline-block;
      font-size: calc($countdown-size * 0.4);
      font-weight: 600;
      line-height: 1;


    }
  }
  .image{
    position: absolute;
    left: -2rem;
    top: -2rem;
    width: 120%;
    img{
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.25s ease;
  position: relative;
  display: inline-block;
  left: 0;
}

.flip-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.flip-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.flip-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.flip-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
