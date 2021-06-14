<template>
  <GameOverlay alt center-content show-logo data-test="stats-overlay">
    <template #title>
      Stats
    </template>
    <template #msg>
      <p>Showing stats for completed games:</p>

      <Table
        :headings="['Played', 'Won', 'Lost', 'Gave Up']"
        :items="stats"
        :placeholder-rows="2"
      />
    </template>
    <template #buttons>
      <Button @click="closeStats" data-test="close-stats-btn">
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

  if (completed >= 0) {
    return stats;
  }

  return [];
};

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    Button,
    Table,
  },
  computed: {
    ...mapGetters(['fullStats', 'isLoading']),
    stats() {
      const { fullStats } = this;
      const stats = calcStats(fullStats);

      return stats;
    },
  },
  methods: {
    ...mapActions(['toggleStats', 'clearFullStats']),
    closeStats() {
      this.toggleStats();
    },
  },
  destroyed() {
    this.clearFullStats();
  },
};
</script>
