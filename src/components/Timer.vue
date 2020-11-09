<template>
  <div>
    Time:
    <span data-test="timer">{{ formattedTime }}</span>
  </div>
</template>

<script>
import numeral from 'numeral';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['timer', 'isGamePaused']),
    formattedTime() {
      const { timer } = this;

      return numeral(timer).format('00:00:00');
    },
  },
  mounted() {
    this.setGameTimer();
  },
  watch: {
    isGamePaused(val, oldVal) {
      if (val.isPaused === oldVal.isPaused) return;

      if (val.isPaused) {
        this.clearTimer();
      } else {
        this.setGameTimer();
      }
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    initGameTimer() {
      return window.setInterval(() => this.updateTimer(), 1000);
    },
    setGameTimer() {
      const { isPaused } = this.isGamePaused;

      if (!isPaused) {
        this.gameTimer = this.initGameTimer();
      }
    },
    clearTimer() {
      clearInterval(this.gameTimer);
    },
  },
};
</script>
