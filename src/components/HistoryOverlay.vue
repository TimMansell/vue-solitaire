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
      <GameHistory v-if="userStats.completed" />
      <p v-if="!userStats.completed">
        You have played no games yet
      </p>
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GameHistory from '@/components/GameHistory.vue';

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    GameHistory,
  },
  computed: {
    ...mapGetters(['userStats']),
  },
  methods: {
    ...mapActions(['toggleHistory']),
  },
};
</script>
