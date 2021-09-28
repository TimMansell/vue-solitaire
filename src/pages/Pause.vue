<template>
  <GameOverlay center-content show-logo data-test="game-paused">
    <template #title> Game Paused page</template>
    <template #msg>
      <p v-if="!isGameActive">Your game has been paused due to inactivity</p>
      <GameSummary />
    </template>
    <template #buttons>
      <ResumeGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import ResumeGameButton from '@/components/ResumeGameButton.vue';

export default {
  name: 'GamePaused',
  components: {
    GameOverlay,
    ResumeGameButton,
    GameSummary,
  },
  computed: {
    ...mapGetters(['isGameActive']),
  },
};
</script>
