<template>
  <div class="controls">
    <button
      class="controls__btn"
      @click="restartGame">
      New Game
    </button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
      this.$store.dispatch('initGame');
    },
  },
};
</script>

<style lang="scss" scoped>
.controls {
  position: fixed;
  right: .5rem;
  top: .5rem;

  &__btn {
    font-size: 1rem;
  }
}
</style>
