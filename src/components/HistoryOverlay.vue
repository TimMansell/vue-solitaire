<template>
  <GameOverlay
    ref="historyOverlay"
    center-content
    data-test="history-overlay"
    :btn-close="toggleHistory"
  >
    <template #title>
      History
    </template>
    <template #msg>
      <GameHistory v-if="userStats.completed" @scrollTo="scrollTo" />
      <p v-if="!userStats.completed" data-test="game-history-no-games-msg">
        You have not played any games yet
      </p>
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueScrollTo from 'vue-scrollto';
import GameOverlay from '@/components/GameOverlay.vue';
import GameHistory from '@/components/GameHistory.vue';

export default {
  name: 'HistoryOverlay',
  components: {
    GameOverlay,
    GameHistory,
  },
  computed: {
    ...mapGetters(['userStats']),
  },
  methods: {
    ...mapActions(['toggleHistory']),
    scrollTo(elem) {
      const { historyOverlay } = this.$refs;

      VueScrollTo.scrollTo(elem, {
        container: historyOverlay.$el,
        offset: -10,
      });
    },
  },
};
</script>
