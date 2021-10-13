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
    ...mapGetters(['timer', 'isGamePaused', 'hasCards']),
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
      const { hasCards } = this;

      if (isPaused === isPausedPrev || !hasCards) return;

      if (isPaused) {
        this.gameTimer.pause();
        return;
      }

      this.gameTimer.resume();
    },
    hasCards(cards, cardsPrev) {
      const { isGamePaused } = this;

      if (cards === cardsPrev || isGamePaused) return;

      if (cards) {
        this.gameTimer.resume();
        return;
      }

      this.gameTimer.stop();
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    checkInitialState() {
      const { isGamePaused, hasCards } = this;

      if (!isGamePaused && hasCards) {
        this.gameTimer.resume();

        return;
      }

      this.gameTimer.pause();
    },
  },
};
</script>
