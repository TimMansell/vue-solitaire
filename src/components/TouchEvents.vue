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
  emits: ['swipe'],
  mounted() {
    this.init();
  },
  unmounted() {
    this.hammer.stop();
    this.hammer.destroy();
  },
  methods: {
    init() {
      this.hammer = new Hammer.Manager(this.$refs.swipe);

      this.hammer.add(
        new Hammer.Swipe({
          direction: Hammer.DIRECTION_VERTICAL,
          velocity: 0.2,
          threshold: 5,
        })
      );

      this.hammer.on('swipe', () => this.$emit('swipe'));
    },
  },
};
</script>
