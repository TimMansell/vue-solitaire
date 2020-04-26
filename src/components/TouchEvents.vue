<template>
  <div ref="swipe">
    <slot />
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  name: 'TouchEvents',
  mounted() {
    const hammertime = new Hammer(this.$refs.swipe);

    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

    hammertime.on('swipe', () => {
      this.swipe();
    });

    hammertime.on('doubletap', () => {
      this.doubleTap();
    });
  },
  methods: {
    swipe() {
      this.$emit('swipe');
    },
    doubleTap() {
      this.$emit('doubletap');
    },
  },
};
</script>
