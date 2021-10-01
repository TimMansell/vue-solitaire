<template>
  <GameOverlay center-content show-logo data-test="game-new">
    <template #title> Are you sure?</template>
    <template #msg>
      <p>This game will still count towards your statistics</p>
    </template>
    <template #buttons>
      <StartNewGameButton />
      <ContinueGameButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import StartNewGameButton from '@/components/StartNewGameButton.vue';
import ContinueGameButton from '@/components/ContinueGameButton.vue';

export default {
  name: 'NewPage',
  components: {
    GameOverlay,
    StartNewGameButton,
    ContinueGameButton,
  },
};
</script>
