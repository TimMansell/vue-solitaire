<template>
  <GameOverlay center-content show-logo data-test="game-paused">
    <template #title> Game Paused </template>
    <template #msg>
      <p v-if="!isGameActive">Your game has been paused due to inactivity</p>
      <GameSummary />
    </template>
    <template #buttons>
      <PauseGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import PauseGameButton from './PauseGameButton.vue';

export default {
  name: 'GamePaused',
  components: {
    GameOverlay,
    PauseGameButton,
    GameSummary,
  },
  computed: {
    ...mapGetters(['isGameActive']),
  },
};
</script>
