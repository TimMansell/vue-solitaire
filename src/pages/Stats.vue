<template>
  <GameOverlay center-content show-close data-test="stats-overlay">
    <template #title> Your Stats </template>
    <template #msg>
      <Stats />
    </template>
  </GameOverlay>
</template>

<script>
import GameOverlay from '@/components/GameOverlay.vue';
import Stats from '@/components/Stats.vue';

export default {
  name: 'StatsPage',
  components: {
    GameOverlay,
    Stats,
  },
};
</script>
