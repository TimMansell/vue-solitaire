<template>
  <div>
    Games: <span data-test="stats">{{ userStats.gameNumber }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters(['userStats']),
  },
};
</script>
