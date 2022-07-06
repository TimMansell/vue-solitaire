<template>
  <Button
    :is-stacked="true"
    :check-disabled="true"
    route="stats"
    data-test="stats-btn"
  >
    Stats
  </Button>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'ViewStatsButton',
  components: {
    Button,
  },
};
</script>
