<template>
  <div class="stats">Games played: {{ userStats.totalGames }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters('dbModule', ['userStats']),
  },
};
</script>

<style scoped lang="scss">
.stats {
  margin-bottom: var(--mg-sm);
  color: var(--text-primary);
  font-size: var(--font-size);

  @media (min-width: $bp-md) {
    margin-bottom: var(--mg-md);
    font-size: var(--font-size-lg);
  }
}
</style>
