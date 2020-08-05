<template>
  <div>
    <div>Total games played: {{ totalGames }}</div>
    <div data-test="board">
      <Foundation />
      <Columns />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Foundation from '@/components/Foundation.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Foundation,
    Columns,
  },
  computed: {
    ...mapGetters(['totalGames']),
  },
};
</script>
