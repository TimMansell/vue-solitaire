<template>
  <div data-test="leaderboards">
    <p v-if="name" data-test="leaderboard-name">
      Your player name is: {{ name }}
    </p>

    <div ref="scrollTo">
      <Filters>
        <Select
          v-model="filters.showBest"
          label="Best"
          :items="bestItems"
          @select="setBest"
          data-test="leaderboard-set-best"
        />

        <Select
          v-model="filters.limit"
          label="Top"
          :items="limitItems"
          @select="displayLimit"
          data-test="leaderboard-set-top"
        />
      </Filters>
    </div>

    <p data-test="leaderboards-heading">Top {{ limit }} Best {{ best }}</p>

    <ResponsiveTable
      :headings="['Rank', 'Date', 'Player', `${best}`]"
      :items="leaderboardsUsingLocalTimeZone"
      :placeholder-rows="limit"
      :to-highlight="{ key: 'player', value: name }"
    />
  </div>
</template>

<script>
import xss from 'xss';
import { mapGetters, mapActions } from 'vuex';
import Filters from '@/components/Filters.vue';
import Select from '@/components/Select.vue';
import ResponsiveTable from '@/components/ResponsiveTable.vue';
import { formatDate } from '@/helpers/dates';

export default {
  name: 'Leaderboards',
  components: {
    Filters,
    Select,
    ResponsiveTable,
  },
  data() {
    return {
      bestItems: ['moves', 'times'],
      limitItems: [25, 50, 100, 500],
      filters: {
        limit: parseInt(xss(this.$route.params.limit), 10),
        showBest: xss(this.$route.params.showBest),
      },
    };
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
    ...mapGetters(['leaderboards', 'name']),
    leaderboardsUsingLocalTimeZone() {
      const { leaderboards } = this;

      return leaderboards.map((leaderboard) => ({
        ...leaderboard,
        date: formatDate(leaderboard.date),
      }));
    },
    showBest() {
      return this.filters.showBest;
    },
    limit() {
      return this.filters.limit;
    },
    best() {
      const { showBest } = this.filters;

      return showBest.charAt(0).toUpperCase() + showBest.slice(1);
    },
  },
  mounted() {
    this.checkInitialFilters();
    this.displayGames();
  },
  methods: {
    ...mapActions(['getLeaderboards']),
    checkInitialFilters() {
      const { limitItems, bestItems, filters } = this;
      const { limit, showBest } = filters;

      const validLimit = limitItems.includes(limit);
      const validBest = bestItems.includes(showBest);

      this.filters.limit = validLimit ? limit : limitItems[0];
      this.filters.showBest = validBest ? showBest : bestItems[0];
    },
    displayLimit(limit) {
      this.filters.limit = parseInt(limit, 10);
    },
    setBest(showBest) {
      this.filters.showBest = showBest;
    },
    displayGames() {
      const { filters } = this;

      this.getLeaderboards(filters);
    },
    scrollTo() {
      this.$emit('scrollTo', this.$refs.scrollTo);
    },
    updateUrl() {
      const { showBest, limit } = this;

      this.$router.replace(`/leaderboards/${showBest}/${limit}`);
    },
  },
};
</script>
