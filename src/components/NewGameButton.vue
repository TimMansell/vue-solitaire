<template>
  <Button @click="newGame" data-test="new-game-btn">
    New Game
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  props: {
    completed: {
      type: Boolean,
      default: false,
    },
    showConfirmation: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(['restartGame', 'initGame', 'toggleNewGame']),
    newGame() {
      const { completed, showConfirmation } = this;

      if (showConfirmation) {
        this.toggleNewGame();

        return;
      }

      this.restartGame(completed);
      this.initGame();
    },
  },
};
</script>
