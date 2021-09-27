<template>
  <GameOverlay center-content show-logo data-test="game-lost">
    <template #title> Sorry, no more Moves! </template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <NewGameButton />
      <ShowBoardButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import NewGameButton from '@/components/NewGameButton.vue';
import ShowBoardButton from './ShowBoardButton.vue';

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    NewGameButton,
    GameSummary,
    ShowBoardButton,
  },
};
</script>
