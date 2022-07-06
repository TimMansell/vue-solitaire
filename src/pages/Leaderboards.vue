<template>
  <GameOverlay
    ref="leaderboardOverlay"
    center-content
    show-close
    data-test="leaderboards"
  >
    <template #title> Leaderboards </template>
    <template #msg>
      <Leaderboards />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import Leaderboards from '@/components/Leaderboards.vue';

export default {
  name: 'LeaderboardsPage',
  components: {
    GameOverlay,
    Leaderboards,
  },
};
</script>
