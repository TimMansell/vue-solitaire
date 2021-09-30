<template>
  <header class="header">
    <Controls />
    <GameStats />
  </header>
</template>

<script>
import Controls from '@/components/Controls.vue';
import GameStats from '@/components/GameStats.vue';

export default {
  name: 'Header',
  components: {
    Controls,
    GameStats,
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  text-shadow: 0 1px var(--col-primary-alt-3);
  padding: var(--pd-sm);
  background: var(--bg-primary);

  @media (min-width: $bp-sm) {
    flex-direction: row;
    border-bottom: 1px solid var(--bdr-secondary);
    box-shadow: 0 1px var(--bg-secondary-alt);
    margin-bottom: var(--mg-sm);
  }
}
</style>
