<template>
  <GameOverlay center-content show-logo data-test="game-won">
    <template #title>
      Congratulations, you win!
    </template>
    <template #buttons>
      <NewGameButton is-completed />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import NewGameButton from './NewGameButton.vue';

export default {
  name: 'GameWon',
  components: {
    GameOverlay,
    NewGameButton,
  },
};
</script>
