<template>
  <div :class="classes">
    <div
      class="card-placeholder__card"
      v-for="(_, index) in cards"
      :key="index"
    >
      <SvgIcon name="Card_back_17" />
    </div>
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
    cards: {
      type: Number,
      default: 1,
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

  &__card {
    &:nth-of-type(n + 2) {
      margin-top: -110%;
    }
  }
}
</style>
