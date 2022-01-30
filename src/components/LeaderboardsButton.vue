<template>
  <Button
    @click="$router.push('/leaderboards')"
    :check-disabled="true"
    :is-stacked="true"
    data-test="leaderboards-btn"
  >
    Ranks
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'LeaderboardsButton',
  components: {
    Button,
  },
};
</script>
