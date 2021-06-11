<template>
  <div id="game-history" data-test="game-history">
    <p>You have played a total of {{ completed }} games</p>

    <div class="game-history__controls">
      <div>Page: {{ page }} / {{ totalPages }}</div>

      <Select
        v-model="limit"
        label="Show games / page"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <ResponsiveTable
      :headings="['#', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
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

      this.displayGames();
    },
    page(newPage) {
      const { limit } = this;
      const offset = (newPage - 1) * limit;

      this.offset = offset;

      this.displayGames();
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
  },
  mounted() {
    this.displayGames();
  },
  methods: {
    ...mapActions(['getAllGames']),
    displayPage(page) {
      this.page = page;
    },
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
    displayGames() {
      const { offset, limit } = this;

      this.getAllGames({ offset, limit });

      VueScrollTo.scrollTo('#game-history', {
        container: '#history-overlay',
        offset: -10,
      });
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
    margin-bottom: var(--mg-sm);
    border: 1px solid var(--bdr-secondary);
  }
}
</style>
