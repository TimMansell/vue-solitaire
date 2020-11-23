<template>
  <div :class="classes">
    <SvgIcon data-test="card-placeholder" name="Card_back_17" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'CardPlaceholder',
  components: {
    SvgIcon,
  },
  props: {
    seeThrough: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { seeThrough } = this;

      return {
        'card-placeholder': seeThrough,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.card-placeholder {
  opacity: 0.15;
}
</style>
