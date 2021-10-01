<template>
  <GameOverlay center-content show-logo data-test="game-lost">
    <template #title> Sorry, no more Moves! </template>
    <template #msg>
      <GameSummary />
    </template>
    <template #buttons>
      <StartNewGameButton />
      <ShowBoardButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import GameSummary from '@/components/GameSummary.vue';
import StartNewGameButton from '@/components/StartNewGameButton.vue';
import ShowBoardButton from '@/components/ShowBoardButton.vue';

export default {
  name: 'LostPage',
  components: {
    GameOverlay,
    StartNewGameButton,
    GameSummary,
    ShowBoardButton,
  },
};
</script>
