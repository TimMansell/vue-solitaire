<template>
  <div class="game-history" data-test="game-history">
    <p data-test="game-history-total-games" :data-games="completed">
      You have played a total of {{ completed | formatNumber }} games
    </p>

    <div
      id="game-history-controls"
      class="game-history__controls"
      data-test="game-history-controls"
    >
      <div data-test="game-history-pages">
        Page: {{ page | formatNumber }} / {{ totalPages | formatNumber }}
      </div>

      <Select
        v-model="limit"
        label="Games per page"
        :items="['25', '50', '100', '500']"
        @select="displayLimit"
      />
    </div>

    <p data-test="game-history-showing-games">
      Showing games {{ showingFrom | formatNumber }} to
      {{ showingTo | formatNumber }}
    </p>

    <ResponsiveTable
      :headings="['Game', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="games"
      :placeholder-rows="limit"
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

export const calcNumber = (value) => numeral(value).format('0,0');

export const gameOutcome = ({ won, lost }) => {
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
  filters: {
    formatNumber(value) {
      return calcNumber(value);
    },
  },
  watch: {
    limit() {
      this.offset = 0;
      this.page = 1;

      this.displayGames({ autoScroll: true });
    },
    page(newPage) {
      const { limit } = this;
      const offset = (newPage - 1) * limit;

      this.offset = offset;

      this.displayGames({ autoScroll: true });
    },
    gameHistory() {
      const { gameHistory, offset, completed } = this;

      const formattedGames = gameHistory.map(
        ({ won, lost, date, moves, time }, index) => ({
          number: calcNumber(completed - offset - index),
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
    showingFrom() {
      const { offset, completed } = this;

      const showingFrom = completed - offset;

      return showingFrom;
    },
    showingTo() {
      const { gameHistory, offset, completed } = this;

      const showingTo = completed - offset - gameHistory.length + 1;

      return showingTo;
    },
  },
  mounted() {
    this.displayGames({ autoScroll: false });
  },
  methods: {
    ...mapActions(['getAllGames']),
    displayPage(page) {
      this.page = page;
    },
    displayLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
    async displayGames({ autoScroll }) {
      const { offset, limit } = this;

      this.games = [];

      await this.getAllGames({ offset, limit });

      if (autoScroll) {
        this.scrollTo();
      }
    },
    scrollTo() {
      VueScrollTo.scrollTo('#game-history-controls', {
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
    margin-bottom: var(--mg-md);
    border: 1px solid var(--bdr-secondary);
  }
}
</style>
