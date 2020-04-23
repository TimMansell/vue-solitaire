<template>
  <div @click="handleClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DoubleClick',
  data() {
    return {
      clickCount: 0,
      clickTimer: null,
    };
  },
  props: {
    tag: {
      type: String,
      default: 'a',
    },
    delay: {
      type: Number,
      default: 250,
    },
  },
  methods: {
    handleClick(e) {
      e.preventDefault();

      this.clickCount += 1;

      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0;
          this.$emit('single-click');
        }, this.delay);
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer);
        this.clickCount = 0;
        this.$emit('double-click');
      }
    },
  },
};
</script>
