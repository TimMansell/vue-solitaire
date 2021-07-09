<template>
  <footer class="footer">
    <GlobalGames />
    <Version />
    <Players />
  </footer>
</template>

<script>
import GlobalGames from '@/components/GlobalGames.vue';
import Version from '@/components/Version.vue';
import Players from '@/components/Players.vue';

export default {
  name: 'Footer',
  components: {
    GlobalGames,
    Version,
    Players,
  },
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: var(--pd-sm);
  font-size: var(--font-size-sm);
  line-height: 1;
  color: var(--text-primary);
  text-shadow: 0 1px var(--col-primary-dark-2);
  background: var(--bg-primary);

  @media (min-width: $bp-sm) {
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid rgba($col-secondary, 0.05);
    box-shadow: 0 -1px var(--bdr-secondary);
  }

  @media (min-width: $bp-lg) {
    font-size: var(--font-size);
  }
}
</style>
