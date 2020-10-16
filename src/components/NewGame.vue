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
  },
  methods: {
    ...mapActions(['restartGame', 'initGame', 'initGlobalStats']),
    newGame() {
      const { completed } = this;

      this.restartGame(completed);
      this.initGame();
      this.initGlobalStats();

      this.$gtag.event('New Game', { event_category: 'Buttons' });
    },
  },
};
</script>
