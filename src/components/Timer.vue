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
    ...mapGetters(['timer', 'isTimerPaused']),
    formattedTime() {
      const { timer } = this;

      return numeral(timer).format('00:00:00');
    },
  },
  mounted() {
    this.setGameTimer();
  },
  watch: {
    isTimerPaused(val, oldVal) {
      if (val === oldVal) return;

      if (val) {
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
      const { isTimerPaused } = this;

      if (!isTimerPaused) {
        this.gameTimer = this.initGameTimer();
      }
    },
    clearTimer() {
      clearInterval(this.gameTimer);
    },
  },
};
</script>
