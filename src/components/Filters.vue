<template>
  <div class="filters" data-test="filters">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Filters',
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: space-between;
  padding: var(--pd-sm);
  margin-bottom: var(--mg-md);
  border: 1px solid var(--bdr-secondary);
}
</style>
