<template>
  <div class="solitaire">
    <Board />
    <GameState />
    <RulesOverlay v-if="showRules" />
    <StatsOverlay v-if="showStats" />
    <NewGameOverlay v-if="showNewGame" />
    <CheckVersion />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameState from '@/components/GameState.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';
import NewGameOverlay from '@/components/NewGameOverlay.vue';
import CheckVersion from '@/components/CheckVersion.vue';
// import fixture from '../../tests/fixtures/boards/noMovesKingColumn.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameState,
    RulesOverlay,
    StatsOverlay,
    NewGameOverlay,
    CheckVersion,
  },
  computed: {
    ...mapGetters(['showStats', 'showRules', 'showNewGame']),
  },
  async created() {
    this.initLocalUser();
    this.initApp();

    // Force cypress to wait until async functions have loaded.
    if (window.Cypress) {
      window.appReady = true;
    }

    // if (process.env.NODE_ENV === 'development') {
    //   this.setBoardAndFoundation(fixture);
    // }
  },
  methods: {
    ...mapActions(['initLocalUser', 'initApp', 'setBoardAndFoundation']),
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
