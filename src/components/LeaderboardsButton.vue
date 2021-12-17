<template>
  <Button
    @click="$router.push('/leaderboards')"
    :is-stacked="true"
    :disabled="!hasCards || !isOnline || isGamePaused"
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
    ...mapGetters(['hasCards', 'isOnline', 'isGamePaused']),
  },
};
</script>
