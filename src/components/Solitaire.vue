<template>
  <div class="solitaire">
    <Board />
    <GameState />
    <RulesOverlay v-if="showRules" />
    <StatsOverlay v-if="showStats" />
    <LeaderboardsOverlay v-if="showLeaderboards" />
    <NewGameOverlay v-if="showNewGame" />
    <HistoryOverlay v-if="showHistory" />
    <CheckVersion />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameState from '@/components/GameState.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';
import LeaderboardsOverlay from '@/components/LeaderboardsOverlay.vue';
import NewGameOverlay from '@/components/NewGameOverlay.vue';
import HistoryOverlay from '@/components/HistoryOverlay.vue';
import CheckVersion from '@/components/CheckVersion.vue';

export default {
  name: 'Home',
  components: {
    Board,
    GameState,
    RulesOverlay,
    StatsOverlay,
    LeaderboardsOverlay,
    NewGameOverlay,
    HistoryOverlay,
    CheckVersion,
  },
  computed: {
    ...mapGetters([
      'showStats',
      'showRules',
      'showNewGame',
      'showHistory',
      'showLeaderboards',
    ]),
  },
  async created() {
    this.initApp();
  },
  methods: {
    ...mapActions(['initApp']),
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
