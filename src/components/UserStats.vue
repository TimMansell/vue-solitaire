<template>
  <div>
    Games: <span data-test="stats">{{ userStats.gameNumber }}</span> (<Button
      link
      @click="viewStats"
      data-test="view-stats"
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

export default {
  name: 'Stats',
  components: {
    UserStatsOverlay,
    Button,
  },
  computed: {
    ...mapGetters(['userStats', 'showStats']),
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
