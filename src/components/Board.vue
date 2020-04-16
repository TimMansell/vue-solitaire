<template>
  <div data-test="board">
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
