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
  },
  watch: {
    disabled(newValue) {
      this.hammer.set({ enable: !newValue });
    },
  },
  methods: {
    init() {
      this.hammer = new Hammer(this.$refs.swipe);

      this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

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
