<template>
  <div class="stats">
    <UserStats />
    <Moves />
    <Timer />
  </div>
</template>

<script>
import UserStats from '@/components/UserStats.vue';
import Timer from '@/components/Timer.vue';
import Moves from '@/components/Moves.vue';

export default {
  name: 'Stats',
  components: {
    UserStats,
    Timer,
    Moves,
  },
};
</script>

<style scoped lang="scss">
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  width: 100%;
  line-height: 1.25;
  color: var(--text-primary);

  @media (min-width: $bp-sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0 var(--mg-sm);
    order: -1;
    width: auto;
  }

  > * {
    &:nth-child(1) {
      @media (min-width: $bp-sm) {
        grid-area: 1 / 1 / 2 / 2;
      }
    }

    &:nth-child(2) {
      text-align: center;

      &::before {
        @media (min-width: $bp-sm) {
          content: '/';
          margin-right: var(--mg-sm);
        }
      }

      @media (min-width: $bp-sm) {
        grid-area: 2 / 2 / 3 / 3;
        text-align: left;
      }
    }

    &:nth-child(3) {
      text-align: right;

      @media (min-width: $bp-sm) {
        grid-area: 2 / 1 / 3 / 2;
        text-align: left;
      }
    }
  }
}
</style>
