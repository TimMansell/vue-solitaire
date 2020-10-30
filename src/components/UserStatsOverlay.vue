<template>
  <GameOverlay alt data-test="user-stats-overlay">
    <template #title> Stats </template>
    <template #msg>
      <div>Played: {{ played }} (1 in progress)</div>
      <div>Won: {{ won }}</div>
      <div>Lost: {{ lost }}</div>
      <div>Gave up: {{ abandoned }}</div>
    </template>
    <template #buttons> <Button @click="closeStats">Close</Button> </template>
  </GameOverlay>
</template>

<script>
import numeral from 'numeral';
import { mapActions, mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import Button from '@/components/Button.vue';

const calcPercent = (value) => numeral(value).format('0.00%');

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    Button,
  },
  computed: {
    ...mapGetters(['fullUserStats']),
    played() {
      const { completed } = this.fullUserStats;

      return completed;
    },
    won() {
      const { completed, won } = this.fullUserStats;
      const wonPercent = calcPercent(won / completed);

      return `${won} (${wonPercent})`;
    },
    lost() {
      const { completed, lost } = this.fullUserStats;
      const lostPercent = calcPercent(lost / completed);

      return `${lost} (${lostPercent})`;
    },
    abandoned() {
      const { won, lost, completed } = this.fullUserStats;
      const abandoned = completed - won - lost;
      const abandonedPercent = calcPercent(abandoned / completed);

      return `${abandoned} (${abandonedPercent})`;
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
