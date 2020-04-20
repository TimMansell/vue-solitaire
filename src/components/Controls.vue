<template>
  <div class="controls">
    <button class="controls__btn" @click="restartGame" data-test="new-game">
      New Game
    </button>
    <div>
      <input
        @change="toggleAutoRevealCards"
        type="checkbox"
        id="checkbox"
        v-model="autoRevealCards"
      />
      <label for="checkbox">Auto-reveal cards</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  data() {
    return {
      autoRevealCards: true,
    };
  },
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
      this.$store.dispatch('initGame');
    },
    toggleAutoRevealCards() {
      console.log('auto reveal', this.autoRevealCards);
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
