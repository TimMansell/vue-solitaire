<template>
  <svg class="svg-icon" viewBox="0 0 100 140">
    <use :href="src" />
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
  },
  computed: {
    src() {
      const { name } = this;

      return `#card-${name}`;
    },
  },
};
</script>

<style scoped lang="scss">
.svg-icon {
  width: 100%;
}
</style>
