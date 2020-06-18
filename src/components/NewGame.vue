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
  methods: {
    ...mapActions(['restartGame', 'initGame']),
    newGame() {
      this.restartGame();
      this.initGame();
    },
  },
};
</script>
