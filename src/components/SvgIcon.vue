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
  height: $card-height;
  width: $card-width;

  @media (min-width: $bp-sm) {
    height: $card-height-sm;
    width: $card-width-sm;
  }

  @media (min-width: $bp-md) {
    height: $card-height-md;
    width: $card-width-md;
  }

  @media (min-width: $bp-lg) {
    height: $card-height-lg;
    width: $card-width-lg;
  }

  @media (min-width: $bp-xl) {
    height: $card-height-xl;
    width: $card-width-xl;
  }
}
</style>
