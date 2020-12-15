<template>
  <GameOverlay alt center-content show-logo data-test="game-new">
    <template #title> Are you sure? </template>
    <template #msg>
      This will count towards your abandoned games statistics
    </template>
    <template #buttons>
      <Button @click="newGame" data-test="new-game-overlay-new-btn">
        New Game
      </Button>
      <Button @click="continueGame" data-test="new-game-overlay-continue-btn">
        Continue Game
      </Button>
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from './Button.vue';

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    Button,
  },
  mounted() {
    this.setGamePaused();
  },
  methods: {
    ...mapActions(['restartGame', 'initGame', 'setGamePaused', 'setGameResumed', 'toggleNewGame']),
    newGame() {
      this.restartGame();
      this.initGame();
    },
    continueGame() {
      this.setGameResumed();
      this.toggleNewGame();
    },
  },
};
</script>
