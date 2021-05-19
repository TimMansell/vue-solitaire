<template>
  <GameOverlay
    id="history-overlay"
    alt
    center-content
    data-test="game-history"
    :btn-close="toggleHistory"
  >
    <template #title>
      History
    </template>
    <template #msg>
      <GameHistory />
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GameHistory from '@/components/GameHistory.vue';

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    GameHistory,
  },
  methods: {
    ...mapActions(['toggleHistory']),
  },
};
</script>
