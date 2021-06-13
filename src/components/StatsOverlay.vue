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

const calcPercent = (value) => numeral(value).format('0.00%');

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
      const {
        fullStats: { completed, won, lost },
      } = this;
      const abandoned = completed - won - lost;

      const wonPercent = calcPercent(won / completed);
      const lostPercent = calcPercent(lost / completed);
      const abandonedPercent = calcPercent(abandoned / completed);

      if (completed) {
        return [
          [completed, won, lost, abandoned],
          ['', wonPercent, lostPercent, abandonedPercent],
        ];
      }

      return [];
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
