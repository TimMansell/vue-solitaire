<template>
  <GameOverlay center-content show-logo data-test="stats-overlay">
    <template #title>
      Your Stats
    </template>
    <template #msg>
      <Table
        :headings="['Played', 'Won', 'Lost', 'Gave Up']"
        :items="userStatstics"
        :placeholder-rows="2"
      />
      <h1>Global Stats</h1>
      <Table
        :headings="['Played', 'Won', 'Lost', 'Gave Up']"
        :items="globalStatstics"
        :placeholder-rows="2"
      />
    </template>
    <template #buttons>
      <Button @click="toggleStats" data-test="close-stats-btn">
        Close
      </Button>
    </template>
  </GameOverlay>
</template>

<script>
import numeral from 'numeral';
import { mapActions, mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';
import Table from '@/components/Table.vue';

export const calcPercent = (value) => numeral(value).format('0.00%');

export const calcNumber = (value) => numeral(value).format('0,0');

export const calcStats = ({ completed, won, lost }) => {
  if (!completed) {
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
    Button,
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
    ...mapActions(['toggleStats', 'getStats', 'clearStats']),
  },
  mounted() {
    this.getStats();
  },
  destroyed() {
    this.clearStats();
  },
};
</script>
