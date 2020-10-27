<template>
  <div>
    Time:
    <span data-test="timer">{{ timer }}</span
    >s
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['timer', 'isGamePaused']),
  },
  mounted() {
    // Only init game timer in app so cypress can test visibilityState
    if (!window.Cypress) {
      this.setGameTimer();
    }
  },
  watch: {
    isGamePaused({ paused }) {
      if (paused) {
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
      if (!this.isGamePaused.paused) {
        this.gameTimer = this.initGameTimer();
      }
    },
    toggleGameTimer(e) {
      if (e.target.visibilityState === 'hidden') {
        this.clearTimer();
      }
    },
    clearTimer() {
      clearInterval(this.gameTimer);
    },
  },
};
</script>
