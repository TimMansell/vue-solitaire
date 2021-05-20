<template>
  <GameOverlay
    id="history-overlay"
    alt
    center-content
    data-test="history-overlay"
    :btn-close="toggleHistory"
  >
    <template #title>
      History
    </template>
    <template #msg>
      <GameHistory v-if="userStats.completed" />
      <p v-if="!userStats.completed" data-test="game-history-no-games-msg">
        You have not played any games yet
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
