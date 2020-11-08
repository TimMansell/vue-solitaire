<template>
  <div>
    Games: <span data-test="stats">{{ userStats.gameNumber }}</span> (<ViewStatsButton />)
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'Stats',
  components: {
    ViewStatsButton,
  },
  computed: {
    ...mapGetters(['userStats']),
  },
};
</script>
