<template>
  <div ref="card">
    <SvgIcon :width="width" :class="classes" data-test="card-placeholder" name="Card_back_17" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'CardPlaceholder',
  components: {
    SvgIcon,
  },
  data() {
    return {
      width: 0,
    };
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
  mounted() {
    const { card } = this.$refs;

    this.width = card.offsetWidth;
  },
};
</script>

<style scoped lang="scss">
.card-placeholder {
  opacity: 0.15;
}
</style>
