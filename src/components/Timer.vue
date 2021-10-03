<template>
  <div>
    Time:
    <span data-test="timer">{{ formattedTime }}</span>
  </div>
</template>

<script>
import pauseMe from 'pause-me';
import numeral from 'numeral';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['duration', 'isGamePaused']),
    formattedTime() {
      const { duration } = this;

      return numeral(duration).format('00:00:00');
    },
  },
  mounted() {
    this.gameTimer = pauseMe(() => this.updateTimer(), 1000, true);
  },
  destroyed() {
    clearInterval(this.gameTimer);
  },
  watch: {
    isGamePaused(val, oldVal) {
      if (val === oldVal) return;

      if (val) {
        this.gameTimer.pause();
        return;
      }

      this.gameTimer.resume();
    },
  },
  methods: {
    ...mapActions(['updateTimer']),
  },
};
</script>
