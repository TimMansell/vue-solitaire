<template>
  <Button
    :is-stacked="true"
    @click="toggleLeaderboards"
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
    ...mapActions(['toggleLeaderboards']),
  },
};
</script>
