<template>
  <div class="game-history" data-test="game-history">
    <p data-test="game-history-total-games" :data-games="userGameCount">
      You have played a total of {{ userGameCount | formatNumber }} games
    </p>

    <div
      ref="scrollTo"
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
      :placeholder-rows="pageRows"
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
      const { gameHistory, offset, userGameCount } = this;

      const formattedGames = gameHistory.map(
        ({ won, lost, date, moves, time }, index) => ({
          number: calcNumber(userGameCount - offset - index),
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
    ...mapGetters(['gameHistory', 'userGameCount']),
    totalPages() {
      const { limit, userGameCount } = this;

      const pages = Math.ceil(userGameCount / limit);

      return pages;
    },
    showingFrom() {
      const { offset, userGameCount } = this;

      const showingFrom = userGameCount - offset;

      return showingFrom;
    },
    showingTo() {
      const { showingFrom, pageRows } = this;

      const showingTo = showingFrom - pageRows + 1;

      return showingTo;
    },
    pageRows() {
      const { limit, totalPages, page, pageGamesCount } = this;

      if (page === totalPages) {
        return pageGamesCount;
      }

      return limit;
    },
    pageGamesCount() {
      const { limit, userGameCount } = this;

      const pageGamesCount = userGameCount % limit;

      return pageGamesCount;
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
      const {
        offset,
        limit,
        $refs: { scrollTo },
      } = this;

      this.games = [];

      await this.getAllGames({ offset, limit });

      if (autoScroll) {
        this.$emit('scrollTo', scrollTo);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.game-history {
  &__controls {
    display: flex;
    justify-content: space-between;
    padding: var(--pd-sm);
    margin-bottom: var(--mg-md);
    border: 1px solid var(--bdr-secondary);
  }
}
</style>
