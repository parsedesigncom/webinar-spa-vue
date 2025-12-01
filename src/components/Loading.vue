<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

interface Props {
  name: 'Loading-b' | 'Loading-w' | 'Loading-r';
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100px',
  height: '100px'
});

const animationContainer = ref<HTMLDivElement | null>(null);
const animation = ref<AnimationItem | null>(null);

const loadAnimation = async () => {
  if (animationContainer.value) {
    try {
      // Zuerst die vorhandene Animation löschen, wenn sie existiert
      if (animation.value) {
        animation.value.destroy();
      }

      // JSON-Datei dynamisch importieren
      const animationData = await import(`../assets/${props.name}.json`);

      // Neue Animation erstellen
      animation.value = lottie.loadAnimation({
        container: animationContainer.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData.default
      });
    } catch (error) {
      console.error('Fehler beim Laden der Animation:', error);
    }
  }
};

// Animation laden, wenn die Komponente gemountet wird
onMounted(() => {
  loadAnimation();
});

// Animation zerstören, wenn die Komponente unmounted wird
onUnmounted(() => {
  if (animation.value) {
    animation.value.destroy();
  }
});

// Die Animation neu laden, wenn sich der Name ändert
watch(() => props.name, () => {
  loadAnimation();
});
</script>

<template>
  <div
      ref="animationContainer"
      class="animation-container"
      :style="{ width: props.width, height: props.height }"
  ></div>
</template>

<style scoped>
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>