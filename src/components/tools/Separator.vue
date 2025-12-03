<template>
  <div :class="['component-holder-Separator', cssClass]">
    <div :style="wrapperStyle">
      <div
          :class="computedClass"
          :style="computedStyle"
      ></div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Separator",
  props: {
    length: {
      type: String,
      default: "250px"
    },
    thickness: {
      type: String,
      default: "2px"
    },
    lineStyle: {
      type: String,
      default: "solid", // Standardstil ist durchgezogene Linie
      validator: (value) => ["solid", "dashed", "dotted"].includes(value)
    },
    cssClass: {
      type: String,
      default: ""
    },
    alignment: {
      type: String,
      default: "center", // Standardpositionierung ist zentriert
      validator: (value) => ["left", "center", "right"].includes(value)
    }
  },
  computed: {
    wrapperStyle() {
      const alignmentStyles = {
        left: "flex-start",
        center: "center",
        right: "flex-end"
      };
      return {
        display: "flex",
        justifyContent: alignmentStyles[this.alignment]
      };
    },
    computedStyle() {
      return {
        width: this.length,
        height: this.thickness,
        borderTopStyle: this.lineStyle,
        borderTopWidth: this.thickness,
        margin: 0
      };
    },
    computedClass() {
      return [this.cssClass];
    }
  }
};
</script>

<style scoped lang="scss">
.component-holder-Separator{
  &.color-text-gray{
    div{
      border-color:$color-text-gray;
    }
  }
}

</style>
