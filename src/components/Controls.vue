<template>
  <div class="controls">
    <button class="controls__btn" @click="restartGame" data-test="new-game">
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
  right: 0.5rem;
  top: 0.5rem;

  &__btn {
    font-size: 1rem;
  }
}
</style>
