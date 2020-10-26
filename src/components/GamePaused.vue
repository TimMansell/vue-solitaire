<template>
  <GameOverlay v-if="isGamePaused" data-test="game-paused">
    <template #title> Game Paused </template>
    <template #buttons>
      <PauseGameButton @toggle-pause="setGameTimer" />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import PauseGameButton from './PauseGameButton.vue';

export default {
  name: 'GamePaused',
  components: {
    GameOverlay,
    PauseGameButton,
  },
  computed: {
    ...mapGetters(['isGamePaused']),
  },
  props: {
    completed: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // Only init game timer in app so cypress can test visibilityState
    if (!window.Cypress) {
      this.setGameTimer();
    }

    window.addEventListener(
      'visibilitychange',
      (e) => setTimeout(this.toggleGameTimer, 2000, e),
      false
    );
  },
  destroyed() {
    window.removeEventListener('visibilitychange', this.toggleGameTimer);
  },
  methods: {
    ...mapActions(['updateTimer', 'setGamePaused']),
    initGameTimer() {
      return window.setInterval(() => this.updateTimer(), 1000);
    },
    setGameTimer() {
      if (!this.isGamePaused) {
        this.gameTimer = this.initGameTimer();
      }
    },
    toggleGameTimer(e) {
      console.log(e.target.visibilityState);

      if (e.target.visibilityState === 'hidden') {
        clearInterval(this.gameTimer);

        this.setGamePaused(true);
      }
    },
  },
};
</script>
