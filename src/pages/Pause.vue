<template>
  <GameOverlay center-content show-logo data-test="game-paused">
    <template #title> Game Paused</template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <ResumeGameButton />
    </template>
  </GameOverlay>
</template>

<script>
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
};
</script>
