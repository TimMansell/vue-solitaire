<template>
  <Button
    @click="$router.push('/stats')"
    :is-stacked="true"
    :check-disabled="true"
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
