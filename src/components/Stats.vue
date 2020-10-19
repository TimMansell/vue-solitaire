<template>
  <div class="stats">
    <UserStats class="stats__user" />
    <div class="stats__games">
      Time:
      <span data-test="timer">{{ timer }}</span
      >s
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserStats from '@/components/UserStats.vue';

export default {
  name: 'Stats',
  components: {
    UserStats,
  },
  computed: {
    ...mapGetters(['userStats', 'timer']),
  },
};
</script>

<style scoped lang="scss">
.stats {
  display: flex;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
  justify-content: space-between;
  width: 100%;

  @media (min-width: $bp-sm) {
    flex-direction: column;
    order: -1;
    width: auto;
  }
}
</style>
