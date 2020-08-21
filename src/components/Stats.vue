<template>
  <div class="stats">
    <UserStats class="stats__user" />
    <GlobalStats class="stats__global" />
  </div>
</template>

<script>
import UserStats from '@/components/UserStats.vue';
import GlobalStats from '@/components/GlobalStats.vue';

export default {
  name: 'Stats',
  components: {
    UserStats,
    GlobalStats,
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
    margin-bottom: var(--mg-md);
    font-size: var(--font-size-lg);
  }

  &__user {
    flex: 1;
  }

  &__global {
    display: block;

    @media (min-width: $bp-md) {
      display: none;
    }
  }
}
</style>
