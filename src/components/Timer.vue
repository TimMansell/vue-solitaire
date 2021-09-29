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
    const { isGamePaused } = this;

    this.setTimer(isGamePaused);
  },
  destroyed() {
    clearInterval(this.gameTimer);
  },
  watch: {
    isGamePaused(val, oldVal) {
      if (val === oldVal) return;

      this.setTimer(val);
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    setTimer(isPaused) {
      if (!isPaused) {
        this.gameTimer = window.setInterval(() => this.updateTimer(), 1000);
      } else {
        clearInterval(this.gameTimer);
      }
    },
  },
};
</script>
