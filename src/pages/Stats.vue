<template>
  <GameOverlay center-content show-close data-test="stats-overlay">
    <template #title> Your Stats </template>
    <template #msg>
      <Table
        :headings="['Played', 'Won', 'Lost', 'Gave Up']"
        :items="userStatstics"
        :placeholder-rows="2"
        data-test="user-stats"
      />
      <h1>Global Stats</h1>
      <Table
        :headings="['Played', 'Won', 'Lost', 'Gave Up']"
        :items="globalStatstics"
        :placeholder-rows="2"
        data-test="global-stats"
      />
    </template>
  </GameOverlay>
</template>

<script>
import numeral from 'numeral';
import { mapActions, mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Table from '@/components/Table.vue';

export const calcPercent = (value) => numeral(value).format('0.00%');

export const calcNumber = (value) => numeral(value).format('0,0');

export const calcStats = ({ completed, won, lost }) => {
  if (!completed && completed !== 0) {
    return [];
  }

  const abandoned = completed - won - lost;

  const completedCount = calcNumber(completed);
  const wonCount = calcNumber(won);
  const lostCount = calcNumber(lost);
  const abandonedCount = calcNumber(abandoned);

  const wonPercent = calcPercent(won / completed);
  const lostPercent = calcPercent(lost / completed);
  const abandonedPercent = calcPercent(abandoned / completed);

  const stats = [
    [completedCount, wonCount, lostCount, abandonedCount],
    ['', wonPercent, lostPercent, abandonedPercent],
  ];

  return stats;
};

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    Table,
  },
  computed: {
    ...mapGetters(['userStats', 'globalStats']),
    userStatstics() {
      const { userStats } = this;
      const stats = calcStats(userStats);

      return stats;
    },
    globalStatstics() {
      const { globalStats } = this;
      const stats = calcStats(globalStats);

      return stats;
    },
  },
  methods: {
    ...mapActions(['getStats', 'clearStats']),
  },
  mounted() {
    this.getStats();
  },
  destroyed() {
    this.clearStats();
  },
};
</script>
