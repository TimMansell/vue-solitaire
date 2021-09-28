<template>
  <RouterLink to="/stats">
    <Button :is-stacked="true" :disabled="isGameLoading" data-test="stats-btn">
      Stats
    </Button>
  </RouterLink>
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
