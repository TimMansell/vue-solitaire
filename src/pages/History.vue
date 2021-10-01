<template>
  <GameOverlay
    ref="historyOverlay"
    center-content
    show-close
    data-test="history-overlay"
  >
    <template #title> History </template>
    <template #msg>
      <GameHistory v-if="userGameCount" @scrollTo="scrollTo" />
      <NoGames v-if="!userGameCount" data-test="game-history-no-games-msg" />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import VueScrollTo from 'vue-scrollto';
import GameOverlay from '@/components/GameOverlay.vue';
import GameHistory from '@/components/GameHistory.vue';
import NoGames from '@/components/NoGames.vue';

export default {
  name: 'GamesPage',
  components: {
    GameOverlay,
    GameHistory,
    NoGames,
  },
  computed: {
    ...mapGetters(['userGameCount']),
  },
  methods: {
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
