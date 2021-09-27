<template>
  <GameOverlay center-content show-logo data-test="game-won">
    <template #title> Congratulations, you win! </template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <NewGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import NewGameButton from '@/components/NewGameButton.vue';

export default {
  name: 'GameWon',
  components: {
    GameOverlay,
    NewGameButton,
    GameSummary,
  },
};
</script>
