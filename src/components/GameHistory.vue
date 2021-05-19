<template>
  <div id="game-history">
    <p class="game-history__message">
      Showing results for all {{ userStats.completed }} games played
    </p>

    <Select
      v-model="limit"
      label="Display games per page"
      :items="['25', '50', '100', '500']"
      @select="formatLimit"
    />

    <ResponsiveTable
      :headings="['#', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="games"
    />

    <Pagination :pages="pages" :start-on="page" @changepage="displayPage" />
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
    limit(newLimit) {
      this.offset = 0;
      this.page = 1;

      this.getAllGames({ offset: 0, limit: newLimit });
    },
  },
  computed: {
    ...mapGetters(['gameHistory', 'userStats']),
    games() {
      const {
        gameHistory,
        offset,
        userStats: { completed },
      } = this;

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
    ...mapActions(['getAllGames']),
    async displayPage(page) {
      const { limit } = this;
      const offset = (page - 1) * limit;

      this.offset = offset;
      this.page = page;

      await this.getAllGames({ offset, limit });

      VueScrollTo.scrollTo('#game-history', {
        container: '#history-overlay',
        offset: -10,
      });
    },
    formatLimit(limit) {
      this.limit = parseInt(limit, 10);
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
