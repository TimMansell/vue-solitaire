<template>
  <GameOverlay alt data-test="user-stats-overlay">
    <template #title> Stats </template>
    <template #msg>
      <div>Played: {{ played }}</div>
      <div>Won: {{ won }}</div>
      <div>Lost: {{ lost }}</div>
      <div>Finished: {{ finished }}</div>
      <div>Gave up: {{ abandoned }}</div>
    </template>
    <template #buttons> <Button @click="toggleStats">Close</Button> </template>
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
      const { count } = this.fullUserStats;

      return count;
    },
    won() {
      const { count, won } = this.fullUserStats;
      const wonPercent = calcPercent(won / count);

      return `${won} (${wonPercent})`;
    },
    lost() {
      const { count, lost } = this.fullUserStats;
      const lostPercent = calcPercent(lost / count);

      return `${lost} (${lostPercent})`;
    },
    finished() {
      const { count, completed } = this.fullUserStats;
      // const abandoned = count - completed;
      const completedPercent = calcPercent(completed / count);

      return `${completed} (${completedPercent})`;
    },
    abandoned() {
      const { count, completed } = this.fullUserStats;
      const abandoned = count - completed;
      const abandonedPercent = calcPercent(abandoned / count);

      return `${abandoned} (${abandonedPercent})`;
    },
  },
  mounted() {
    this.getUserStats();
  },
  methods: {
    ...mapActions(['getUserStats', 'toggleStats']),
  },
};
</script>
