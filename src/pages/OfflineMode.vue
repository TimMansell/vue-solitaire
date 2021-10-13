<template>
  <GameOverlay show-close data-test="offline-mode">
    <template #title> Offline mode</template>
    <template #msg>
      <p>
        An online database is used to keep track of game statistics. If, for
        some reason you become disconnected, you will be in offline mode.
      </p>
      <p>Offline mode happens when:</p>
      <ul>
        <li>The server goes offline</li>
        <li>Your connection to the server goes down or is interupted</li>
        <li>Your connection to the internet has gone down or is interupted</li>
        <li>The server is down for maintenance / updates</li>
      </ul>
      <p>How can I fix this?</p>
      <p>
        Usually the only thing you can do (other than waiting for server to come
        back online) is to refresh the page to initiate a new connection.
      </p>
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'OfflineMode',
  components: {
    GameOverlay,
  },
};
</script>
