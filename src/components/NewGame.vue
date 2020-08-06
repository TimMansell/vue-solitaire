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
    quit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(['restartGame', 'initGame']),
    newGame() {
      const { quit } = this;

      this.restartGame(quit);
      this.initGame();

      this.$gtag.event('New Game', { event_category: 'Buttons' });
    },
  },
};
</script>
