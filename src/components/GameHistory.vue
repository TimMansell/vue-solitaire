<template>
  <div data-test="game-history">
    <p data-test="game-history-total-games" :data-games="userGameCount">
      You have played a total of {{ userGameCount | formatNumber }} games
    </p>

    <div ref="scrollTo">
      <Filters>
        <div data-test="game-history-pages">
          Page: {{ page | formatNumber }} / {{ totalPages | formatNumber }}
        </div>

        <Select
          v-model="filters.limit"
          label="Games"
          :items="limitItems"
          @select="displayLimit"
        />
      </Filters>
    </div>

    <p data-test="game-history-showing-games">
      Showing games {{ showingFrom | formatNumber }} to
      {{ showingTo | formatNumber }}
    </p>

    <ResponsiveTable
      :headings="['Game', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="gameHistory"
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
      limitItems: [25, 50, 100, 500],
      filters: {
        page: parseInt(xss(this.$route.params.page), 10),
        limit: parseInt(xss(this.$route.params.limit), 10),
      },
    };
  },
  filters: {
    formatNumber(value) {
      return formatNumber(value);
    },
  },
  watch: {
    filters: {
      async handler() {
        await this.displayGames();

        this.updateUrl();
        this.scrollTo();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['gameHistory', 'userGameCount']),
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
  mounted() {
    this.checkInitialFilters();
    this.displayGames();
  },
  methods: {
    ...mapActions(['getAllGames']),
    checkInitialFilters() {
      const { limitItems, filters, totalPages } = this;
      const { limit, page } = filters;

      const validLimit = limitItems.includes(limit);

      this.filters.limit = validLimit ? limit : limitItems[0];
      this.filters.page = page <= totalPages ? page : 1;
    },
    displayPage(page) {
      this.filters.page = page;
    },
    displayLimit(limit) {
      this.filters.page = 1;
      this.filters.limit = parseInt(limit, 10);
    },
    async displayGames() {
      const { offset, limit } = this;

      await this.getAllGames({ offset, limit });
    },
    scrollTo() {
      this.$emit('scrollTo', this.$refs.scrollTo);
    },
    updateUrl() {
      const { page, limit } = this;

      this.$router.replace(`/history/${page}/${limit}`);
    },
  },
};
</script>
