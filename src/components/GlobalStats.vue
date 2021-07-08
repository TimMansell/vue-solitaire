<template>
  <div class="global-stats">
    <div class="global-stats__item">
      <Players />
    </div>
    <div class="global-stats__version">
      <Version />
    </div>
    <div class="global-stats__item">
      <GlobalGames />
    </div>
  </div>
</template>

<script>
import Players from '@/components/Players.vue';
import Version from '@/components/Version.vue';
import GlobalGames from '@/components/GlobalGames.vue';

export default {
  name: 'GlobalStats',
  components: {
    Players,
    Version,
    GlobalGames,
  },
};
</script>

<style lang="scss" scoped>
.global-stats {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;

  @media (min-width: $bp-sm) {
    justify-content: start;
    border-bottom: 0;
    box-shadow: none;
    width: auto;
  }

  &__item {
    @media (min-width: $bp-sm) {
      margin-right: var(--mg-sm);
    }
  }

  &__version {
    display: block;

    @media (min-width: $bp-sm) {
      display: none;
    }
  }
}
</style>
