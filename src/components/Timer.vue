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
    ...mapGetters(['timer', 'isGamePaused', 'emptyBoard']),
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
      const { emptyBoard } = this;

      if (isPaused === isPausedPrev || emptyBoard) return;

      if (isPaused) {
        this.gameTimer.pause();
        return;
      }

      this.gameTimer.resume();
    },
    emptyBoard(emptyBoard, emptyBoardPrev) {
      const { isGamePaused } = this;

      if (emptyBoard === emptyBoardPrev || isGamePaused) return;

      if (emptyBoard) {
        this.gameTimer.stop();
        return;
      }

      this.gameTimer.resume();
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    checkInitialState() {
      const { isGamePaused, emptyBoard } = this;

      if (!isGamePaused && !emptyBoard) {
        this.gameTimer.resume();

        return;
      }

      this.gameTimer.pause();
    },
  },
};
</script>
