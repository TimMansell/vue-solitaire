<template>
  <Button
    :is-stacked="true"
    @click="toggleLeaderboards"
    data-test="leaderboards-btn"
  >
    Rank
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'LeaderboardsButton',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['toggleLeaderboards']),
  },
};
</script>
