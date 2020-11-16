<template>
  <GameOverlay alt centered show-logo data-test="stats-overlay">
    <template #title> Stats </template>
    <template #msg>
      <p>Showing stats for completed games:</p>
      <div>Played: <Counter :number="played" /></div>
      <div>Won: <Counter :number="won.count" /> ({{ won.percent }})</div>
      <div>Lost: <Counter :number="lost.count" /> ({{ lost.percent }})</div>
      <div>Gave up: <Counter :number="abandoned.count" /> ({{ abandoned.percent }})</div>
    </template>
    <template #buttons>
      <Button @click="closeStats" data-test="close-stats-btn">Close</Button>
    </template>
  </GameOverlay>
</template>

<script>
import numeral from 'numeral';
import { mapActions, mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';
import Counter from '@/components/Counter.vue';

const calcPercent = (value) => numeral(value).format('0.00%');

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    Button,
    Counter,
  },
  computed: {
    ...mapGetters(['fullStats']),
    played() {
      const { completed } = this.fullStats;

      return completed;
    },
    won() {
      const { completed, won } = this.fullStats;
      const percent = calcPercent(won / completed);

      return {
        count: won,
        percent,
      };
    },
    lost() {
      const { completed, lost } = this.fullStats;
      const percent = calcPercent(lost / completed);

      return {
        count: lost,
        percent,
      };
    },
    abandoned() {
      const { won, lost, completed } = this.fullStats;
      const abandoned = completed - won - lost;
      const percent = calcPercent(abandoned / completed);

      return {
        count: abandoned,
        percent,
      };
    },
  },
  methods: {
    ...mapActions(['toggleStats', 'setGameResumed']),
    closeStats() {
      this.setGameResumed();
      this.toggleStats();
    },
  },
};
</script>
