<template>
  <div class="stats">
    <div class="stats__games">
      Games played: <span data-test="stats">{{ userStats.gameNumber }}</span>
    </div>
    <div>
      Time:
      <span data-test="timer">{{ timer }}s</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['userStats', 'timer']),
  },
};
</script>

<style scoped lang="scss">
.stats {
  display: flex;
  margin-bottom: var(--mg-sm);
  color: var(--text-primary);
  font-size: var(--font-size);

  @media (min-width: $bp-md) {
    display: block;
    margin-bottom: var(--mg-md);
    font-size: var(--font-size-lg);
  }

  &__games {
    flex: 1;
  }
}
</style>
