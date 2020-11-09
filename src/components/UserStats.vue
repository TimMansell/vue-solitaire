<template>
  <div>
    Games: <Counter data-test="stats" :number="number" /> (<Button
      link
      @click="viewStats"
      data-test="view-stats-btn"
    >
      view stats </Button
    >)
    <UserStatsOverlay v-if="showStats" data-test="user-stats" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UserStatsOverlay from '@/components/UserStatsOverlay.vue';
import Button from '@/components/Button.vue';
import Counter from '@/components/Counter.vue';

export default {
  name: 'Stats',
  components: {
    UserStatsOverlay,
    Button,
    Counter,
  },
  computed: {
    ...mapGetters(['userStats', 'showStats']),
    number() {
      const {
        userStats: { gameNumber },
      } = this;

      return gameNumber;
    },
  },
  methods: {
    ...mapActions(['toggleStats', 'setGamePaused']),
    viewStats() {
      const isPaused = {
        isPaused: true,
        isActive: false,
        showMsg: false,
      };

      this.setGamePaused(isPaused);
      this.toggleStats();
    },
  },
};
</script>
