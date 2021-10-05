<template>
  <GameOverlay center-content show-logo data-test="connection-lost">
    <template #title> Connection to server has been lost :(</template>
    <template #msg>
      <p>
        This could be due to unscheduled server maintenance or loss of signal
      </p>
      <p>Please refresh the page or wait until server reconnects</p>
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'ConnectionLost',
  components: {
    GameOverlay,
  },
};
</script>
