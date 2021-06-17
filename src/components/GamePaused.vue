<template>
  <GameOverlay center-content show-logo data-test="game-paused">
    <template #title>
      Game Paused
    </template>
    <template #msg v-if="!isGameActive">
      Your game has been paused due to inactivity
    </template>
    <template #buttons>
      <PauseGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import PauseGameButton from './PauseGameButton.vue';

export default {
  name: 'GamePaused',
  components: {
    GameOverlay,
    PauseGameButton,
  },
  computed: {
    ...mapGetters(['isGameActive']),
  },
};
</script>
