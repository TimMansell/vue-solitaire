<template>
  <div ref="swipe">
    <slot />
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  name: 'TouchEvents',
  data() {
    return {
      hammer: '',
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.hammer.stop();
    this.hammer.destroy();
  },
  methods: {
    init() {
      this.hammer = new Hammer.Manager(this.$refs.swipe);
      this.hammer.add(
        new Hammer.Tap({ event: 'doubletap', taps: 2, threshold: 10, interval: 200 })
      );
      this.hammer.add(
        new Hammer.Swipe({ direction: Hammer.DIRECTION_VERTICAL, velocity: 0.2, threshold: 5 })
      );

      this.hammer.on('swipe', () => {
        this.swipe();
      });

      this.hammer.on('doubletap', () => {
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
