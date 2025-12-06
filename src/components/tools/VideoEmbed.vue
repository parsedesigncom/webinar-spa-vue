<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src: string
  title?: string
}>()

const embedUrl = computed(() => {
  const url = props.src?.trim()
  if (!url) return null

  const youtubeId = getYouTubeId(url)
  if (youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`
  }

  const vimeoId = getVimeoId(url)
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}`
  }

  return null
})

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)

    // youtu.be/VIDEO_ID
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '') || null
    }

    // youtube.com/watch?v=VIDEO_ID oder andere Varianten
    if (u.hostname.includes('youtube.com')) {
      // Bereits eine embed-URL?
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.replace('/embed/', '') || null
      }

      const v = u.searchParams.get('v')
      if (v) return v
    }
  } catch {
    // Fällt zurück auf einfache Regex
    const match = url.match(
        /(?:youtube\.com.*(?:v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
    )
    return match ? match[1] : null
  }

  return null
}

function getVimeoId(url: string): string | null {
  try {
    const u = new URL(url)

    if (!u.hostname.includes('vimeo.com')) return null

    // Pfad in Segmente teilen und die letzte numerische ID nehmen
    const segments = u.pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    if (!lastSegment) return null

    const idMatch = lastSegment.match(/^(\d+)$/)
    return idMatch ? idMatch[1] : null
  } catch {
    // Fallback mit Regex
    const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
    return match ? match[1] : null
  }
}
</script>

<template>
  <div class="video-embed" v-if="embedUrl">
    <div class="video-embed__ratio">
      <iframe
          :src="embedUrl"
          :title="title || 'Video Player'"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
      ></iframe>
    </div>
  </div>

  <!-- Optional: Fallback falls keine gültige URL erkannt wird -->
  <p v-else class="video-embed__fallback">
    Invalid or unsupported video URL.
  </p>

</template>



<style scoped>
.video-embed {
  max-width: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
}

/* 16:9 Ratio-Box */
.video-embed__ratio {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16 / 9 * 100 */
  height: 0;
  overflow: hidden;
}

.video-embed__ratio iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.video-embed__fallback {
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>
