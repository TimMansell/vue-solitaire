<template>
  <GameOverlay
    ref="leaderboardOverlay"
    center-content
    data-test="history-overlay"
    :btn-close="toggleLeaderboards"
  >
    <template #title>
      Leaderboards
    </template>
    <template #msg>
      <Leaderboards @scrollTo="scrollTo" />
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import VueScrollTo from 'vue-scrollto';
import GameOverlay from '@/components/GameOverlay.vue';
import Leaderboards from '@/components/Leaderboards.vue';

export default {
  name: 'LeaderboardOverlay',
  components: {
    GameOverlay,
    Leaderboards,
  },
  methods: {
    ...mapActions(['toggleLeaderboards']),
    scrollTo(elem) {
      const { leaderboardOverlay } = this.$refs;

      VueScrollTo.scrollTo(elem, {
        container: leaderboardOverlay.$el,
        offset: -10,
      });
    },
  },
};
</script>
