<template>
  <header class="header">
    <Controls />
    <Stats />
  </header>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Stats from '@/components/Stats.vue';

export default {
  name: 'Header',
  components: {
    Controls,
    Stats,
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
  text-shadow: 0 1px var(--col-primary-dark-2);
  padding: var(--pd-sm);
  background: var(--bg-primary);
  font-size: var(--font-size-sm);

  @media (min-width: $bp-sm) {
    flex-direction: row;
    border-bottom: 1px solid var(--bdr-secondary);
    box-shadow: 0 1px rgba($col-secondary, 0.05);
    margin-bottom: var(--mg-sm);
  }

  @media (min-width: $bp-md) {
    font-size: var(--font-size);
    margin-bottom: var(--mg-md);
  }
}
</style>
