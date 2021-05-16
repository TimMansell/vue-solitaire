<template>
  <GameOverlay alt center-content data-test="game-history">
    <template #title>
      History
    </template>
    <template #msg>
      <p>
        Showing {{ from }} - {{ to }} out of {{ userStats.completed }} games
        played
      </p>

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

      <Pagination :pages="pages" @page="displayPage" />
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
import Pagination from '@/components/Pagination.vue';

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
    Pagination,
  },
  data() {
    return {
      offset: 0,
      limit: 25,
    };
  },
  computed: {
    ...mapGetters(['gameHistory', 'userStats']),
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
    from() {
      const { offset } = this;
      const from = offset + 1;

      return from;
    },
    to() {
      const {
        offset,
        limit,
        userStats: { completed },
      } = this;
      const to = offset + limit;

      if (to > completed) {
        return completed;
      }

      return to;
    },
    pages() {
      const {
        limit,
        userStats: { completed },
      } = this;

      const pages = Math.ceil(completed / limit);

      return pages;
    },
  },
  async mounted() {
    const { offset, limit } = this;

    await this.getAllGames({ offset, limit });
  },
  methods: {
    ...mapActions(['toggleHistory', 'getAllGames']),
    async displayPage(page) {
      const { limit } = this;
      const offset = (page - 1) * limit;

      this.offset = offset;

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
