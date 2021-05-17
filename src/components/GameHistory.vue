<template>
  <div>
    <p id="msg">
      Showing {{ from }} - {{ to }} out of {{ userStats.completed }} games
      played
    </p>

    <div>
      Show
      <Select
        v-model="limit"
        :items="['10', '25', '50', '100']"
        @select="formatLimit"
      />results per page
    </div>

    <Table
      :headings="['Date', 'Time', 'Outcome', 'Moves', 'Duration']"
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
import Table from '@/components/Table.vue';
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
    Table,
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
      const { gameHistory } = this;

      const formattedGames = gameHistory.map(
        ({ won, lost, date, moves, time }) => ({
          date: format(parseISO(date), 'dd-MM-yyyy'),
          timePlayed: format(parseISO(date), 'HH:mm:ss'),
          outcome: gameOutcome({ won, lost }),
          moves,
          time: numeral(time).format('00:00:00'),
        })
      );

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
    ...mapActions(['getAllGames']),
    async displayPage(page) {
      const { limit } = this;
      const offset = (page - 1) * limit;

      this.offset = offset;
      this.page = page;

      await this.getAllGames({ offset, limit });

      VueScrollTo.scrollTo('#msg', { container: '#game-history', offset: -20 });
    },
    formatLimit(limit) {
      this.limit = parseInt(limit, 10);
    },
  },
};
</script>
