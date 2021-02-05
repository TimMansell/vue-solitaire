<template>
  <div class="solitaire">
    <Board />
    <GameState />
    <RulesOverlay v-if="showRules" />
    <StatsOverlay v-if="showStats" />
    <NewGameOverlay v-if="showNewGame" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameState from '@/components/GameState.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';
import NewGameOverlay from '@/components/NewGameOverlay.vue';
// import aces from '../../tests/fixtures/boards/noMovesKingColumn.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameState,
    RulesOverlay,
    StatsOverlay,
    NewGameOverlay,
  },
  computed: {
    ...mapGetters(['showStats', 'showRules', 'showNewGame']),
  },
  async created() {
    // await this.initUser();

    // this.initGame();
    this.init();

    // Force cypress to wait until async functions have loaded.
    if (window.Cypress) {
      window.appReady = true;
    }

    // if (process.env.NODE_ENV === 'development') {
    //   this.setBoardAndFoundation(aces);
    // }
  },
  methods: {
    ...mapActions(['init', 'setBoardAndFoundation']),
  },
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
