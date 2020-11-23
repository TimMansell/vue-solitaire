<template>
  <svg :class="className" :style="styles" xmlns="http://www.w3.org/2000/svg" ref="card">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    iconPath() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      let icon = require(`@/assets/icons/${this.name}.svg`);
      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default;
      }

      return icon.url;
    },
    className() {
      return `svg-icon svg-icon--${this.name}`;
    },
    styles() {
      const { width } = this;
      const height = width * 1.4;

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
  },
  mounted() {
    const { card } = this.$refs;
    const {
      parentNode: { clientWidth },
    } = card;

    this.width = clientWidth;
  },
};
</script>

<style lang="scss">
.svg-icon {
  fill: currentColor;
}
</style>
