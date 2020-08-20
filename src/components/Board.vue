<template>
  <div>
    <Stats />
    <div data-test="board">
      <Foundation />
      <Columns />
    </div>
  </div>
</template>

<script>
import Stats from '@/components/Stats.vue';
import Foundation from '@/components/Foundation.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Stats,
    Foundation,
    Columns,
  },
};
</script>
