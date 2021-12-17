<template>
  <Button
    @click="$router.push('/stats')"
    :is-stacked="true"
    :disabled="isEmptyBoard || !isOnline || isGamePaused"
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
    ...mapGetters(['isEmptyBoard', 'isOnline', 'isGamePaused']),
  },
};
</script>
