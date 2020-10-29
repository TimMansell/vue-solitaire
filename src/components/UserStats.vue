<template>
  <div>
    Games: <span data-test="stats">{{ userStats.gameNumber }}</span> (<Button
      link
      @click="toggleStats"
    >
      view stats </Button
    >)
    <UserStatsOverlay v-if="showStats" />
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
    ...mapActions(['toggleStats']),
  },
};
</script>
