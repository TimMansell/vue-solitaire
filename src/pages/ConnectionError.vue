<template>
  <GameOverlay center-content show-logo data-test="connection-error">
    <template #title>No Server Connection</template>
    <template #msg>
      <p>You can wait for the server to come back online or try reconnecting</p>
    </template>
    <template #buttons>
      <ReconnectButton />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import ReconnectButton from '@/components/ReconnectButton.vue';

export default {
  name: 'ConnectionLost',
  components: {
    GameOverlay,
    ReconnectButton,
  },
  computed: {
    ...mapGetters(['hasConnectionError']),
  },
  beforeRouteLeave(to, from, next) {
    const { hasConnectionError } = this;

    if (hasConnectionError) {
      next(false);
    } else {
      next();
    }
  },
};
</script>
