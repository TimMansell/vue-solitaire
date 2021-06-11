<template>
  <div data-test="game-history">
    <p>
      You have played a total of
      <span data-test="game-history-total-games">{{ completed }}</span> games
    </p>

    <div
      id="game-history-controls"
      class="game-history__controls"
      data-test="game-history-controls"
    >
      <div data-test="game-history-pages">
        Page: {{ page }} / {{ totalPages }}
      </div>

      <Select
        v-model="limit"
        label="Games per page"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <p data-test="game-history-showing-games">
      Showing games {{ showingGames.first }} to {{ showingGames.last }}
    </p>

    <ResponsiveTable
      :headings="['Game', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="games"
    />

    <Pagination
      :pages="totalPages"
      :start-on="page"
      @changepage="displayPage"
    />
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';
import numeral from 'numeral';
import VueScrollTo from 'vue-scrollto';
import { mapGetters, mapActions } from 'vuex';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';
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
  name: 'GameHistory',
  components: {
    Select,
    ResponsiveTable,
    Pagination,
  },
  data() {
    return {
      page: 1,
      offset: 0,
      limit: 25,
      games: [],
    };
  },
  watch: {
    limit() {
      this.offset = 0;
      this.page = 1;

      this.displayGames({ scrollTo: true });
    },
    page(newPage) {
      const { limit } = this;
      const offset = (newPage - 1) * limit;

      this.offset = offset;

      this.displayGames({ scrollTo: true });
    },
    gameHistory() {
      const { gameHistory, offset, completed } = this;

      const formattedGames = gameHistory.map(
        ({ won, lost, date, moves, time }, index) => ({
          number: completed - offset - index,
          date: format(parseISO(date), 'dd-MM-yyyy'),
          timePlayed: format(parseISO(date), 'HH:mm:ss'),
          outcome: gameOutcome({ won, lost }),
          moves,
          time: numeral(time).format('00:00:00'),
        })
      );

      this.games = formattedGames;
    },
  },
  computed: {
    ...mapGetters(['gameHistory', 'userStats']),
    completed() {
      const {
        userStats: { completed },
      } = this;

      return completed;
    },
    totalPages() {
      const { limit, completed } = this;

      const pages = Math.ceil(completed / limit);

      return pages;
    },
    showingGames() {
      const { games } = this;
      const [firstGame, ...restGames] = games;
      const [lastGame] = restGames.reverse();

      if (firstGame && lastGame) {
        return {
          first: firstGame.number,
          last: lastGame.number,
        };
      }

      return {};
    },
  },
  mounted() {
    this.displayGames({ scrollTo: false });
  },
  methods: {
    ...mapActions(['getAllGames']),
    displayPage(page) {
      this.page = page;
    },
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
    displayGames({ scrollTo }) {
      const { offset, limit } = this;

      this.getAllGames({ offset, limit });

      if (scrollTo) {
        VueScrollTo.scrollTo('#game-history-controls', {
          container: '#history-overlay',
          offset: -10,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.game-history {
  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--font-size-lg);
    padding: var(--pd-sm);
    margin-bottom: var(--mg-md);
    border: 1px solid var(--bdr-secondary);
  }
}
</style>
