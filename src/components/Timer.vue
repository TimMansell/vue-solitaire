<template>
  <div>
    Time:
    <span data-test="timer">{{ formattedTime }}</span>
  </div>
</template>

<script>
import numeral from 'numeral';
import pauseMe from 'pause-me';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['timer', 'isGamePaused', 'isGameLoading']),
    formattedTime() {
      const { timer } = this;

      return numeral(timer).format('00:00:00');
    },
  },
  mounted() {
    this.gameTimer = pauseMe(() => this.updateTimer(), 1000, true);
    this.checkInitialState();
  },
  destroyed() {
    this.gameTimer.stop();
  },
  watch: {
    isGamePaused(isPaused, isPausedPrev) {
      const { isGameLoading } = this;

      if (isPaused === isPausedPrev || isGameLoading) return;

      if (isPaused) {
        this.gameTimer.pause();
        return;
      }

      this.gameTimer.resume();
    },
    isGameLoading(isLoading, isLoadingPrev) {
      const { isGamePaused } = this;

      if (isLoading === isLoadingPrev || isGamePaused) return;

      if (isLoading) {
        this.gameTimer.stop();
        return;
      }

      this.gameTimer.resume();
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    checkInitialState() {
      const { isGamePaused, isGameLoading } = this;

      if (!isGamePaused && !isGameLoading) {
        this.gameTimer.resume();

        return;
      }

      this.gameTimer.pause();
    },
  },
};
</script>
