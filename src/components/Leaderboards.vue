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
          data-test="leaderboard-set-best"
        />

        <Select
          v-model.number="filters.limit"
          label="Top"
          :items="limitItems"
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
      :to-highlight="{ name }"
    />

    <small v-if="showBest === 'winPercent'">
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
import { findValueInObject } from '@/helpers/find';

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
        this.updateRoute(this.filters);
      },
      deep: true,
    },
    $route: 'displayGames',
  },
  computed: {
    ...mapGetters(['leaderboards', 'name']),
    topHeading() {
      const { showBest } = this;

      const headings = {
        moves: 'Lowest',
        time: 'Quickest',
        winPercent: 'Best',
        wins: 'Most',
      };

      const heading = findValueInObject(headings, ([key]) => key === showBest);

      return heading;
    },
    formattedLeaderboards() {
      const { showBest, leaderboards } = this;

      const formatLeaderboardsContainingDate = (leaderboardsWithDate) =>
        leaderboardsWithDate.map((leaderboard) => ({
          ...leaderboard,
          date: formatDate(leaderboard.date),
        }));

      const formats = {
        moves: () => formatLeaderboardsContainingDate(leaderboards),
        time: () => formatLeaderboardsContainingDate(leaderboards),
        winPercent: () => leaderboards,
        wins: () => leaderboards,
      };

      const formatLeaderboard = findValueInObject(
        formats,
        ([key]) => key === showBest
      );

      const formattedLeaderboard = formatLeaderboard
        ? formatLeaderboard()
        : leaderboards;

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

      const heading = findValueInObject(headings, ([key]) => key === showBest);

      return heading;
    },
    showBest() {
      return this.filters.showBest;
    },
    limit() {
      return this.filters.limit;
    },
    best() {
      const showBest = this.bestItems.find(
        ({ value }) => value === this.showBest
      );

      return showBest?.text;
    },
  },
  created() {
    this.checkInitialFilters();
  },
  mounted() {
    this.displayGames();
  },
  unmounted() {
    this.clearLeaderboards();
  },
  methods: {
    ...mapActions(['getLeaderboards', 'clearLeaderboards', 'updateRoute']),
    checkInitialFilters() {
      const { limitItems, bestItems, limit, showBest } = this;

      const validLimit = limitItems.map(({ value }) => value).includes(limit);
      const validBest = bestItems.map(({ value }) => value).includes(showBest);

      this.filters.limit = validLimit ? limit : limitItems[0].value;
      this.filters.showBest = validBest ? showBest : bestItems[0].value;
    },
    displayGames() {
      const { filters } = this;

      this.getLeaderboards(filters);
    },
  },
};
</script>
