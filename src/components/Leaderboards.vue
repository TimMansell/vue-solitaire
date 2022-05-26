<template>
  <div data-test="leaderboard">
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

    <h2 data-test="leaderboards-heading">
      Top {{ limit }} {{ topHeading }} {{ best }}
    </h2>

    <ResponsiveTable
      :headings="tableHeadings"
      :items="formattedLeaderboards"
      :placeholder-rows="limit"
      :to-highlight="{ key: 'player', value: name }"
    />

    <small v-if="filters.showBest === 'winPercent'">
      * Minimum of 25 games played
    </small>
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
      bestItems: [
        { text: 'Moves', value: 'moves' },
        { text: 'Times', value: 'time' },
        { text: 'Win %', value: 'winPercent' },
        { text: 'Wins', value: 'wins' },
      ],
      limitItems: [
        { text: '25', value: 25 },
        { text: '50', value: 50 },
        { text: '100', value: 100 },
        { text: '500', value: 500 },
      ],
      filters: {
        limit: parseInt(xss(this.$route.params.limit), 10),
        showBest: xss(this.$route.params.showBest),
      },
    };
  },
  watch: {
    filters: {
      handler() {
        this.updateUrl();
      },
      deep: true,
    },
    $route: 'displayGames',
  },
  computed: {
    ...mapGetters(['leaderboards', 'name']),
    topHeading() {
      const { showBest } = this;

      const heading = {
        moves: 'Lowest',
        time: 'Quickest',
        winPercent: 'Best',
        wins: 'Most',
      };

      return heading[showBest];
    },
    formattedLeaderboards() {
      const { showBest, leaderboards } = this;

      const formatLeaderboardsContainingDate = (leaderboardsWithDate) =>
        leaderboardsWithDate.map((leaderboard) => ({
          ...leaderboard,
          date: formatDate(leaderboard.date),
        }));

      const format = {
        moves: () => formatLeaderboardsContainingDate(leaderboards),
        time: () => formatLeaderboardsContainingDate(leaderboards),
        winPercent: () => leaderboards,
        wins: () => leaderboards,
      };

      const formattedLeaderboard = format[showBest]?.() ?? leaderboards;

      return formattedLeaderboard;
    },
    tableHeadings() {
      const { showBest } = this;

      const defaultHeadings = ['', 'Player'];

      const headings = {
        moves: [...defaultHeadings, 'Date', 'Moves'],
        time: [...defaultHeadings, 'Date', 'Times'],
        winPercent: [...defaultHeadings, 'Win %'],
        wins: [...defaultHeadings, 'Wins'],
      };

      return headings[showBest];
    },
    showBest() {
      return this.filters.showBest;
    },
    limit() {
      return this.filters.limit;
    },
    best() {
      const [showBest] = this.bestItems.filter(
        ({ value }) => value === this.filters.showBest
      );

      return showBest?.text;
    },
  },
  mounted() {
    this.checkInitialFilters();
    this.displayGames();
  },
  destroyed() {
    this.clearLeaderboards();
  },
  methods: {
    ...mapActions(['getLeaderboards', 'clearLeaderboards']),
    checkInitialFilters() {
      const { limitItems, bestItems, limit, showBest } = this;

      const validLimit = limitItems.map(({ value }) => value).includes(limit);
      const validBest = bestItems.map(({ value }) => value).includes(showBest);

      this.filters.limit = validLimit ? limit : limitItems[0].value;
      this.filters.showBest = validBest ? showBest : bestItems[0].value;
    },
    displayLimit(limit) {
      this.filters.limit = parseInt(limit, 10);
    },
    setBest(best) {
      this.filters.showBest = best;
    },
    displayGames() {
      const { filters } = this;

      this.getLeaderboards(filters);
    },
    updateUrl() {
      const { limit, showBest } = this;

      this.$router.replace(`/leaderboards/${showBest}/${limit}`);
    },
  },
};
</script>
