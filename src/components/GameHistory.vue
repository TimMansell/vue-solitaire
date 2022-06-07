<template>
  <div data-test="game-history">
    <p data-test="game-history-total-games" :data-games="userGameCount">
      You have played a total of {{ formatNumber(userGameCount) }} games
    </p>

    <div ref="scrollTo">
      <Filters>
        <div data-test="game-history-pages">
          Page: {{ formatNumber(page) }} / {{ formatNumber(totalPages) }}
        </div>

        <Select
          v-model.number="filters.limit"
          label="Games"
          :items="limitItems"
          @select="displayPage(1)"
        />
      </Filters>
    </div>

    <p data-test="game-history-showing-games">
      Showing games {{ formatNumber(showingFrom) }} to
      {{ formatNumber(showingTo) }}
    </p>

    <ResponsiveTable
      :headings="['Game', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="gameHistoryUsingLocalTimeZone"
      :spacing="true"
      :placeholder-rows="pageRows"
      :to-highlight="{ key: 'outcome', value: 'Won' }"
    />

    <Pagination
      :pages="totalPages"
      :start-on="page"
      @changepage="displayPage"
    />
  </div>
</template>

<script>
import xss from 'xss';
import { mapGetters, mapActions } from 'vuex';
import Filters from '@/components/Filters.vue';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';
import Pagination from '@/components/Pagination.vue';
import { formatNumber } from '@/helpers/numbers';
import { formatDate } from '@/helpers/dates';
import { formatTimeFromDate } from '@/helpers/times';

export default {
  name: 'GameHistory',
  components: {
    Filters,
    Select,
    ResponsiveTable,
    Pagination,
  },
  data() {
    return {
      limitItems: [
        { text: '25', value: 25 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: '500', value: 500 },
      ],
      filters: {
        page: parseInt(xss(this.$route.params.page), 10),
        limit: parseInt(xss(this.$route.params.limit), 10),
      },
    };
  },
  watch: {
    filters: {
      handler() {
        this.updateRoute(this.filters);
        this.$emit('scrollTo', this.$refs.scrollTo);
      },
      deep: true,
    },
    $route: 'displayGames',
  },
  computed: {
    ...mapGetters(['gameHistory', 'userGameCount']),
    gameHistoryUsingLocalTimeZone() {
      const { gameHistory } = this;

      return gameHistory.map((game) => ({
        ...game,
        date: formatDate(game.date),
        time: formatTimeFromDate(game.time),
      }));
    },
    page() {
      return this.filters.page;
    },
    limit() {
      return this.filters.limit;
    },
    offset() {
      const { page, limit } = this;

      return (page - 1) * limit;
    },
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
      const { limit, totalPages, page, lastPageRows } = this;

      if (page === totalPages) {
        return lastPageRows;
      }

      return limit;
    },
    lastPageRows() {
      const { limit, userGameCount } = this;

      const lastPageRows = userGameCount % limit;

      if (lastPageRows === 0) {
        return limit;
      }

      return lastPageRows;
    },
  },
  created() {
    this.checkInitialFilters();
  },
  mounted() {
    this.displayGames();
  },
  methods: {
    ...mapActions(['getAllGames', 'updateRoute']),
    checkInitialFilters() {
      const { limitItems, limit, page, totalPages } = this;

      const validLimit = limitItems.map(({ value }) => value).includes(limit);

      this.filters.limit = validLimit ? limit : limitItems[0].value;
      this.filters.page = page <= totalPages ? page : 1;
    },
    formatNumber(number) {
      return formatNumber(number);
    },
    displayPage(page) {
      this.filters.page = page;
    },
    displayGames() {
      const { offset, limit } = this;

      this.getAllGames({ offset, limit });
    },
  },
};
</script>
