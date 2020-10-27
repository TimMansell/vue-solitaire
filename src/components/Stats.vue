<template>
  <div class="stats">
    <UserStats />
    <Timer />
  </div>
</template>

<script>
import UserStats from '@/components/UserStats.vue';
import Timer from '@/components/Timer.vue';

export default {
  name: 'Stats',
  components: {
    UserStats,
    Timer,
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
