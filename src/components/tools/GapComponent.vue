<template>
  <div :style="gapStyle"></div>
</template>

<script>
export default {
  name: "GapComponent",
  props: {
    responsiveConfig: {
      type: String,
      default: "1024-30#768-20#0-10", // Default-Konfiguration: Breite-Höhe Paare
    },
  },
  data() {
    return {
      parsedConfig: [],
      currentHeight: "10px", // Initialwert
    };
  },
  computed: {
    gapStyle() {
      return {
        height: this.currentHeight, // Dynamische Höhe basierend auf `currentHeight`
      };
    },
  },
  methods: {
    parseConfig() {
      const parsed = this.responsiveConfig
          .split("#")
          .map((pair) => {
            const [width, height] = pair.split("-");
            return {
              minWidth: parseInt(width, 10),
              height: height + "px", // Einheit hinzufügen
            };
          })
          .sort((a, b) => b.minWidth - a.minWidth); // Sortiere absteigend nach `minWidth`
      return parsed;
    },
    updateResponsiveHeight() {
      const width = window.innerWidth;

      for (const config of this.parsedConfig) {
        if (width >= config.minWidth) {
          this.currentHeight = config.height;
          return;
        }
      }
      this.currentHeight = "10px"; // Fallback-Wert
    },
  },
  mounted() {
    this.parsedConfig = this.parseConfig();
    this.updateResponsiveHeight(); // Initiale Berechnung

    this.updateGapOnResize = () => {
      this.updateResponsiveHeight();
    };

    window.addEventListener("resize", this.updateGapOnResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateGapOnResize);
  },
};
</script>
