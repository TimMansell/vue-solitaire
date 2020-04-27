<template>
  <button class="new-game__btn" @click="newGame" data-test="new-game-btn">
    New Game
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NewGame',
  methods: {
    ...mapActions(['restartGame', 'initGame']),
    newGame() {
      this.restartGame();
      this.initGame();
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
