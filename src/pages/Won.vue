<template>
  <GameOverlay center-content show-logo data-test="game-won">
    <template #title> Congratulations, you win! </template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <StartNewGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import StartNewGameButton from '@/components/StartNewGameButton.vue';

export default {
  name: 'WonPage',
  components: {
    GameOverlay,
    StartNewGameButton,
    GameSummary,
  },
};
</script>
