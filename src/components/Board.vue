<template>
  <div>
    <Stats />
    <div data-test="board">
      <Foundation />
      <Columns />
    </div>
    <GlobalStats />
  </div>
</template>

<script>
import Stats from '@/components/Stats.vue';
import GlobalStats from '@/components/GlobalStats.vue';
import Foundation from '@/components/Foundation.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Stats,
    GlobalStats,
    Foundation,
    Columns,
  },
};
</script>
