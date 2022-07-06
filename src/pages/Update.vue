<template>
  <GameOverlay center-content show-logo data-test="update">
    <template #title>
      <span>New Update</span>
    </template>
    <template #msg>
      <p>A new version of the game is available</p>
    </template>
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
