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
            <th>Date</th>
            <th>Time</th>
            <th>Outcome</th>
            <th>Moves</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index">
            <td>{{ game.date }}</td>
            <td>{{ game.timePlayed }}</td>
            <td>{{ game.outcome }}</td>
            <td>{{ game.moves }}</td>
            <td>{{ game.time }}</td>
          </tr>
        </tbody>
      </table>

      <button @click="displayGames(1)">
        1
      </button>
      <button @click="displayGames(2)">
        2
      </button>
      <button @click="displayGames(3)">
        3
      </button>
    </template>
    <template #buttons>
      <Button @click="toggleHistory" data-test="close-history-btn">
        Close
      </Button>
    </template>
  </GameOverlay>
</template>

<script>
import { format, parseISO } from 'date-fns';
import numeral from 'numeral';
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
  data() {
    return {
      limit: 50,
    };
  },
  computed: {
    ...mapGetters(['gameHistory']),
    games() {
      const { gameHistory } = this;

      const formattedGames = gameHistory.map((game) => ({
        ...game,
        date: format(parseISO(game.date), 'dd-MM-yyyy'),
        timePlayed: format(parseISO(game.date), 'HH:mm:ss'),
        outcome: gameOutcome(game),
        time: numeral(game.time).format('00:00:00'),
      }));

      return formattedGames;
    },
  },
  async mounted() {
    const { limit } = this;

    await this.getAllGames({ offset: 0, limit });
  },
  methods: {
    ...mapActions(['toggleHistory', 'getAllGames']),
    async displayGames(page) {
      const { limit } = this;
      const offset = (page - 1) * limit;

      await this.getAllGames({ offset, limit });
    },
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
