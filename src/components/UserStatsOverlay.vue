<template>
  <GameOverlay alt data-test="user-stats-overlay">
    <template #title> Stats </template>
    <template #msg>
      <div>Played: <Counter :number="completed" /> (1 in progress)</div>
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
    ...mapGetters(['fullUserStats']),
    completed() {
      const { completed } = this.fullUserStats;

      return completed;
    },
    won() {
      const { completed, won } = this.fullUserStats;
      const percent = calcPercent(won / completed);

      return {
        count: won,
        percent,
      };
    },
    lost() {
      const { completed, lost } = this.fullUserStats;
      const percent = calcPercent(lost / completed);

      return {
        count: lost,
        percent,
      };
    },
    abandoned() {
      const { won, lost, completed } = this.fullUserStats;
      const abandoned = completed - won - lost;
      const percent = calcPercent(abandoned / completed);

      return {
        count: abandoned,
        percent,
      };
    },
  },
  mounted() {
    this.getUserStats();
  },
  methods: {
    ...mapActions(['getUserStats', 'toggleStats', 'setGamePaused']),
    closeStats() {
      const isPaused = {
        isPaused: false,
        isActive: false,
        showMsg: false,
      };

      this.setGamePaused(isPaused);
      this.toggleStats();
    },
  },
};
</script>
