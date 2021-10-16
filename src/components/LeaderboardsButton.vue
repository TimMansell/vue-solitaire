<template>
  <Button
    @click="$router.push('/leaderboards')"
    :is-stacked="true"
    :disabled="emptyBoard || !isOnline"
    data-test="leaderboards-btn"
  >
    Ranks
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'LeaderboardsButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['emptyBoard', 'isOnline']),
  },
};
</script>
