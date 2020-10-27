<template>
  <GameOverlay alt v-if="isGamePaused.paused && hasMoves" data-test="game-paused">
    <template #title>Game Paused</template>
    <template #msg v-if="!isGamePaused.active">
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
    ...mapGetters(['isGamePaused', 'hasMoves']),
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
      if (e.target.visibilityState === 'hidden') {
        const paused = {
          paused: true,
          active: false,
        };

        this.setGamePaused(paused);
      }
    },
  },
};
</script>
