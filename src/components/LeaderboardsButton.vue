<template>
  <Button
    :is-stacked="true"
    :check-disabled="true"
    to-page="leaderboards"
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
