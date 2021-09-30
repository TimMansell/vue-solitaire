<template>
  <Button
    link="/stats"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="stats-btn"
  >
    Stats
  </Button>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ViewStatsButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
};
</script>
