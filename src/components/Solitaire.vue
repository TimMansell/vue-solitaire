<template>
  <div class="solitaire">
    <Board />
    <GameState />
    <RulesOverlay v-if="showRules" data-test="rules-overlay" />
    <StatsOverlay v-if="showStats" data-test="stats-overlay" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameState from '@/components/GameState.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';

// import aces from '../../tests/fixtures/boards/noMovesKingColumn.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameState,
    RulesOverlay,
    StatsOverlay,
  },
  computed: {
    ...mapGetters(['showStats', 'showRules']),
  },
  async created() {
    await this.initUser();

    this.initGame();

    // Force cypress to wait until async functions have loaded.
    if (window.Cypress) {
      window.appReady = true;
    }

    // if (process.env.NODE_ENV === 'development') {
    //   this.setBoardAndFoundation(aces);
    // }
  },
  methods: {
    ...mapActions(['initUser', 'initGame', 'setBoardAndFoundation']),
  },
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;
}
</style>
