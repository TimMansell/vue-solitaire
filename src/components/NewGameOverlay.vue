<template>
  <GameOverlay center-content show-logo data-test="game-new">
    <template #title>
      Are you sure?
    </template>
    <template #msg>
      <p>This game will still count towards your statistics</p>
    </template>
    <template #buttons>
      <NewGameButton />
      <ContinueGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import NewGameButton from './NewGameButton.vue';
import ContinueGameButton from './ContinueGameButton.vue';

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    NewGameButton,
    ContinueGameButton,
  },
};
</script>
