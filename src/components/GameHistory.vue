<template>
  <div id="game-history">
    <p class="game-history__message">
      Showing results for games played
    </p>

    <Select
      v-model="limit"
      label="Display games per page"
      :items="['25', '50', '100', '500']"
      @select="displayLimit"
    />

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
    };
  },
  watch: {
    limit() {
      this.offset = 0;
      this.page = 1;
    },
    page(newPage) {
      const { limit } = this;
      const offset = (newPage - 1) * limit;

      this.offset = offset;

      this.displayGames();

      VueScrollTo.scrollTo('#game-history', {
        container: '#history-overlay',
        offset: -10,
      });
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
    games() {
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

      return formattedGames;
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
    },
  },
};
</script>

<style scoped lang="scss">
.game-history {
  &__message {
    padding-left: 10%;
    padding-right: 10%;
  }
}
</style>
