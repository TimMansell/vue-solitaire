<template>
  <Button
    @click="viewLeaderboards"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="leaderboards-btn"
  >
    Ranks
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'LeaderboardsButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    viewLeaderboards() {
      this.setGamePaused(true);

      this.$router.push('/leaderboards');
    },
  },
};
</script>
