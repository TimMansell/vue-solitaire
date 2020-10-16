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
  margin-bottom: var(--mg-sm);
  color: var(--text-primary);
  font-size: var(--font-size);

  @media (min-width: $bp-md) {
    display: block;
    margin-bottom: var(--mg-md);
    font-size: var(--font-size-lg);
  }

  &__user,
  &__games {
    flex: 1;
  }

  &__games {
    display: flex;
    justify-content: flex-end;

    @media (min-width: $bp-md) {
      display: block;
    }
  }
}
</style>
