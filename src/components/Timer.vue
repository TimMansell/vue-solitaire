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
    ...mapGetters(['timer', 'isGamePaused', 'isEmptyBoard']),
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
      const { isEmptyBoard } = this;

      if (isPaused === isPausedPrev || isEmptyBoard) return;

      if (isPaused) {
        this.gameTimer.pause();
        return;
      }

      this.gameTimer.resume();
    },
    isEmptyBoard(isEmptyBoard, isEmptyBoardPrev) {
      const { isGamePaused } = this;

      if (isEmptyBoard === isEmptyBoardPrev || isGamePaused) return;

      if (isEmptyBoard) {
        this.gameTimer.stop();
        return;
      }

      this.gameTimer.resume();
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
    checkInitialState() {
      const { isGamePaused, isEmptyBoard } = this;

      if (!isGamePaused && !isEmptyBoard) {
        this.gameTimer.resume();

        return;
      }

      this.gameTimer.pause();
    },
  },
};
</script>
