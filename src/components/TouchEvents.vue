<template>
  <div ref="swipe">
    <slot />
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  name: 'TouchEvents',
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const hammertime = new Hammer(this.$refs.swipe);

      hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

      hammertime.on('swipe', () => {
        this.swipe();
      });

      hammertime.on('doubletap', () => {
        this.doubleTap();
      });
    },
    swipe() {
      if (this.disabled) return;

      this.$emit('swipe');
    },
    doubleTap() {
      if (this.disabled) return;

      this.$emit('doubletap');
    },
  },
};
</script>
