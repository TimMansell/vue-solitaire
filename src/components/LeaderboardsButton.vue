<template>
  <Button
    @click="$router.replace('/leaderboards')"
    :is-stacked="true"
    :check-disabled="true"
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
