<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 140"
  >
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
  },
};
</script>

<style scoped lang="scss">
.svg-icon {
  width: 100%;
}
</style>
