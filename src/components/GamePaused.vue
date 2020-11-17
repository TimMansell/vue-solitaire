<template>
  <GameOverlay center-content show-logo alt v-if="showOverlay" data-test="game-paused">
    <template #title>Game Paused</template>
    <template #msg v-if="!isGamePaused.isActive">
      Your game has been paused due to inactivity
    </template>
    <template #buttons>
      <PauseGameButton />
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
    showOverlay() {
      const { isPaused, showMsg } = this.isGamePaused;

      return isPaused && showMsg;
    },
  },
  mounted() {
    window.addEventListener(
      'visibilitychange',
      (e) => setTimeout(this.checkGamePaused, 2000, e),
      false
    );
  },
  destroyed() {
    window.removeEventListener('visibilitychange', this.checkGamePaused);
  },
  methods: {
    ...mapActions(['setGamePaused']),
    checkGamePaused(e) {
      const { isPaused } = this.isGamePaused;
      const { visibilityState } = e.target;

      if (isPaused) return;

      if (visibilityState === 'hidden') {
        const options = {
          showMsg: true,
        };

        this.setGamePaused(options);
      }
    },
  },
};
</script>
