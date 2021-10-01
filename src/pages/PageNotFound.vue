<template>
  <GameOverlay center-content show-logo data-test="404">
    <template #title> Page Not Found :(</template>
    <template #msg>
      <p>Click the button below to be taken back to the game</p>
    </template>
    <template #buttons>
      <HomeButton />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import HomeButton from '@/components/HomeButton.vue';

export default {
  name: 'PageNotFound',
  components: {
    GameOverlay,
    HomeButton,
  },
};
</script>
