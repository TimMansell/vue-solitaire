<template>
  <RouterLink to="/leaderboards">
    <Button
      :is-stacked="true"
      :disabled="isGameLoading"
      data-test="leaderboards-btn"
    >
      Ranks
    </Button>
  </RouterLink>
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
    ...mapGetters(['isGameLoading']),
  },
};
</script>
