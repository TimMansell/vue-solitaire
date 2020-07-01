<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
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

<style lang="scss">
.svg-icon {
  fill: currentColor;
  height: var(--card-height);
  width: var(--card-width);

  @media (min-width: $bp-sm) {
    height: var(--card-height-sm);
    width: var(--card-width-sm);
  }

  @media (min-width: $bp-md) {
    height: var(--card-height-md);
    width: var(--card-width-md);
  }

  @media (min-width: $bp-lg) {
    height: var(--card-height-lg);
    width: var(--card-width-lg);
  }

  @media (min-width: $bp-xl) {
    height: var(--card-height-xl);
    width: var(--card-width-xl);
  }
}
</style>
