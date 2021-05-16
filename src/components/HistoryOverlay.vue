<template>
  <GameOverlay alt center-content show-logo data-test="game-new">
    <template #title>
      Game History
    </template>
    <template #msg>
      <p>Here are your previous games played</p>

      <table class="table">
        <thead>
          <tr>
            <th>Date Played</th>
            <th>Outcome</th>
            <th>Moves</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in allGames" :key="index">
            <td>{{ game.date }}</td>
            <td>{{ game.outcome }}</td>
            <td>{{ game.moves }}</td>
            <td>{{ game.time }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #buttons>
      <Button @click="toggleHistory" data-test="close-history-btn">
        Close
      </Button>
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';

const gameOutcome = ({ won, lost }) => {
  if (won) {
    return 'Won';
  }

  if (lost) {
    return 'Lost';
  }

  return 'Gave Up';
};

export default {
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    Button,
  },
  computed: {
    ...mapGetters(['games']),
    allGames() {
      const { games } = this;

      const formattedGames = games.map((game) => ({
        ...game,
        outcome: gameOutcome(game),
      }));

      return formattedGames;
    },
  },
  async mounted() {
    await this.getAllGames();
  },
  methods: {
    ...mapActions(['toggleHistory', 'getAllGames']),
  },
};
</script>

<style scoped lang="scss">
.table {
  td,
  th {
    border: 1px solid var(--bdr-primary);
    padding: var(--pd-sm);
  }
}
</style>
