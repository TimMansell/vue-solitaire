<template>
  <div>
    <div>Total games played: {{ gamesPlayed }}</div>
    <div data-test="board">
      <Foundation />
      <Columns />
    </div>
  </div>
</template>

<script>
import { gql } from 'apollo-boost';

import Foundation from '@/components/Foundation.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Foundation,
    Columns,
  },
  data() {
    return {
      gamesPlayed: 0,
    };
  },
  async created() {
    const response = await this.$apollo.query({
      query: gql`
        query {
          totalGames {
            count
          }
        }
      `,
    });

    this.gamesPlayed = response.data.totalGames.count;
  },
};
</script>
