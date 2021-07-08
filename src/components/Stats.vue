<template>
  <div class="stats">
    <div class="stats__item">
      <UserGames />
    </div>
    <div class="stats__item">
      <Moves />
    </div>
    <div class="stats__item">
      <Timer />
    </div>
  </div>
</template>

<script>
import UserGames from '@/components/UserGames.vue';
import Timer from '@/components/Timer.vue';
import Moves from '@/components/Moves.vue';

export default {
  name: 'Stats',
  components: {
    UserGames,
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
  font-size: var(--font-size-sm);
  line-height: 1.25;
  color: var(--text-primary);

  @media (min-width: $bp-sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0 var(--mg-sm);
    order: -1;
    width: auto;
  }

  @media (min-width: $bp-md) {
    font-size: var(--font-size);
  }

  &__item {
    &:nth-child(1) {
      @media (min-width: $bp-sm) {
        grid-area: 1 / 1 / 2 / 2;
      }
    }

    &:nth-child(2) {
      text-align: center;

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
