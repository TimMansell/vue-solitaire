<template>
  <div class="board" data-test="board">
    <Foundation />
    <Columns />
  </div>
</template>

<script>
import Foundation from '@/components/Foundation.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Foundation,
    Columns,
  },
};
</script>

<style scoped lang="scss">
.board {
  width: 100%;
  padding-left: var(--pd-sm);
  padding-right: var(--pd-sm);
  margin-bottom: var(--mg-lg);

  @media (min-width: $bp-md) {
    max-width: calc(#{$bp-lg} - (var(--vr) * 2));
    margin-bottom: var(--mg-xl);
  }

  @media (min-width: $bp-lg) {
    max-width: calc(#{$bp-xl} - (var(--vr) * 2));
  }
}
</style>
