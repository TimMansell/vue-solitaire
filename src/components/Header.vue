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

<style lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--bg-primary);
  text-shadow: -1px -1px var(--col-primary-dark);
  padding: var(--pd-sm);

  @media (min-width: $bp-sm) {
    flex-direction: row;
    border-bottom: 1px solid rgba($col-tertiary, 0.2);
    box-shadow: 0 1px rgba($col-secondary, 0.05);
    margin-bottom: var(--mg-sm);
  }

  @media (min-width: $bp-md) {
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
    margin-bottom: var(--mg-md);
  }
}
</style>
