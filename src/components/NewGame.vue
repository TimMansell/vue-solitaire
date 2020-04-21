<template>
  <button class="new-game__btn" @click="restartGame" data-test="new-game">
    New Game
  </button>
</template>

<script>
export default {
  name: 'NewGame',
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
      this.$store.dispatch('initGame');
    },
  },
};
</script>

<style lang="scss" scoped>
.new-game {
  &__btn {
    margin-right: 0.5rem;

    @media (min-width: $bp-md) {
      margin-right: 0;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
