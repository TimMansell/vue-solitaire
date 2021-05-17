<template>
  <GameOverlay
    id="game-history"
    alt
    center-content
    show-divider
    data-test="game-history"
  >
    <template #title>
      History
    </template>
    <template #msg>
      <p id="msg">
        Showing {{ from }} - {{ to }} out of {{ userStats.completed }} games
        played
      </p>

      <Table
        :headings="['Date', 'Time', 'Outcome', 'Moves', 'Duration']"
        :items="games"
      />

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
import VueScrollTo from 'vue-scrollto';
import { mapGetters, mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';
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
  name: 'NewGameOverlay',
  components: {
    GameOverlay,
    Button,
    Table,
    Pagination,
  },
  data() {
    return {
      offset: 0,
      limit: 50,
    };
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
    ...mapActions(['toggleHistory', 'getAllGames']),
    async displayPage(page) {
      const { limit } = this;
      const offset = (page - 1) * limit;

      this.offset = offset;

      await this.getAllGames({ offset, limit });

      VueScrollTo.scrollTo('#msg', { container: '#game-history', offset: -20 });
    },
  },
};
</script>
