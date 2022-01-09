<template>
  <GameOverlay center-content show-logo data-test="game-update">
    <template #title> New Update</template>
    <template #msg> <p>A new version of the website is available</p></template>
    <template #buttons>
      <UpdateButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import UpdateButton from '@/components/UpdateButton.vue';

export default {
  name: 'UpdatePage',
  components: {
    GameOverlay,
    UpdateButton,
  },
};
</script>
